//@flow

import { h } from 'vue';
import moment from 'moment';
import Pikaday from 'pikaday';
import isDate from 'lodash/isDate';
import isString from 'lodash/isString';

import 'pikaday/css/pikaday.css';

function isEvent(modelValue) {
  return modelValue instanceof Event || (modelValue && modelValue.constructor && modelValue.constructor.name === 'Event');
}

export default {
  name: 'vue-pikaday',
  inheritAttrs: false,
  emits: ['update:modelValue', 'update:inputValue', 'update:visible'],
  props: {
    modelValue: {
      validator(modelValue: typeof undefined | null | Date | Event | string): boolean {
        const allowedTypes: Array<typeof undefined | null> = [undefined, null];

        if (isEvent(modelValue)) {
          return true;
        }

        if (isDate(modelValue)) {
          return true;
        }

        if(isString(modelValue) && moment(modelValue).isValid()) {
          return true;
        }

        for (const type of allowedTypes) {
          const allowed: boolean = modelValue === type || typeof modelValue === type;

          if (allowed) {
            return true;
          }
        }

        return false;
      },
      required: true
    },
    visible: {
      type: Boolean,
      default: false
    },
    options: {
      required: false,
      default() {
        return {};
      }
    },
    autoDefault: {
      type: Boolean,
      required: false,
      default: false
    }
  },
  data() {
    return {
      elAttrs: {
        type: 'text'
      },
      defaultOptions: {
        format: 'D MMM YYYY'
      }
    };
  },
  computed: {
    elementAttributes(): Object {
      return Object.assign({}, this.$attrs, this.elAttrs);
    },
    mergedOptions() {
      return Object.assign({}, this.defaultOptions, this.options);
    },
    inputValue(): string | null {
      if (!this.isModelValueValid) {
        return null;
      }
      const inputValue: moment = moment(this.modelValue);
      return inputValue.isValid() ? inputValue.format(this.mergedOptions.format) : null;
    },
    isModelValueValid() {
      return isDate(this.modelValue);
    }
  },
  render(): Object {
    return h('input', {
      ...this.elementAttributes,
      modelValue: this.inputValue
    }, this.$slots.default);
  },
  mounted() {
    this.create();

    this.$watch('modelValue', (modelValue: typeof undefined | null | Date) => {
      if (!this.isModelValueValid) {
        modelValue = null;
      }
      if (!this.visible) {
        this.pikaday.setDate(modelValue, true);
      }
      this.change(modelValue);
    });
  },
  beforeUnmount() {
    this.destroy();
  },
  watch: {
    options: {
      handler() {
        this.reload();
      },
      deep: true
    }
  },
  methods: {
    create() {
      this.mergedOptions.field = this.$el;

      this.bindListener('onSelect', () => this.onSelect());
      this.bindListener('onOpen', () => this.onOpen());
      this.bindListener('onClose', () => this.onClose());

      this.pikaday = new Pikaday(this.mergedOptions);

      let defaultValue: typeof undefined | null | Date = this.value;

      if (!this.modelValue && this.autoDefault) {
        defaultValue = moment().toDate();
        this.change(defaultValue);
      }

      this.pikaday.setDate(defaultValue, true);

      if (this.mergedOptions.bound === false) {
        this.hide();
      } else {
        this.visible ? this.show() : this.hide();
      }
    },
    destroy() {
      this.pikaday.destroy();
    },
    reload() {
      this.destroy();
      this.create();
    },
    change(modelValue: typeof undefined | null | Date) {
      this.$emit('update:modelValue', modelValue);
      this.$emit('update:inputValue', this.inputValue);
    },
    onSelect() {
      this.change(this.pikaday.getDate());
    },
    onOpen() {
      this.$emit('update:visible', true);
    },
    onClose() {
      if (!this.isModelValueValid) {
        this.pikaday.setDate(null, true);
        this.change(null);
      }
      this.$emit('update:visible', false);
    },
    show() {
      this.pikaday.show();
    },
    hide() {
      this.pikaday.hide();
    },
    bindListener(listener: Function, cb: Function) {
      if (this.mergedOptions[listener]) {
        const old: Function = this.mergedOptions[listener];
        this.mergedOptions[listener] = (...args) => {
          old(args);
          cb.apply(this);
        };
      } else {
        this.mergedOptions[listener] = cb;
      }
    }
  }
};
