//@flow

import moment from 'moment';
import Pikaday from 'pikaday';
import isDate from 'lodash/isDate';
import isString from 'lodash/isString';

import 'pikaday/css/pikaday.css';

function isEvent(value) {
  return value instanceof Event || (value && value.constructor && value.constructor.name === 'Event');
}

export default {
  name: 'vue-pikaday',
  inheritAttrs: false,
  props: {
    value: {
      validator(value: typeof undefined | null | Date | Event | string): boolean {
        const allowedTypes: Array<typeof undefined | null> = [undefined, null];

        if (isEvent(value)) {
          return true;
        }

        if (isDate(value)) {
          return true;
        }

        if(isString(value) && moment(value).isValid()) {
          return true;
        }

        for (const type of allowedTypes) {
          const allowed: boolean = value === type || typeof value === type;

          if (allowed) {
            return true;
          }
        }

        return false;
      },
      required: true
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
      visible: false,
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
    }
  },
  render(h: Function): Object {
    return h('input', {
      attrs: this.elementAttributes,
      on: this.$listeners,
      value: this.inputValue(this.value)
    }, this.$slots.default);
  },
  mounted() {
    this.create();

    this.$watch('value', (value: typeof undefined | null | Date) => {
      if (!isDate(value)) {
        value = null;
      }
      if (!this.visible) {
        this.pikaday.setDate(value, true);
      }
      this.change(value);
    });
  },
  beforeDestroy() {
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

      if (!this.value && this.autoDefault) {
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
    change(value: typeof undefined | null | Date) {
      this.$emit('input', value);
      this.$emit('input-value', this.inputValue(value));
    },
    inputValue(value: typeof undefined | null | Date): string | null {
      if (!isDate(value)) {
        return null;
      }
      const inputValue: moment = moment(value);
      return inputValue.isValid() ? inputValue.format(this.mergedOptions.format) : null;
    },
    onSelect() {
      this.change(this.pikaday.getDate());
    },
    onOpen() {
      this.visible = true;
    },
    onClose() {
      if (!isDate(this.value)) {
        this.pikaday.setDate(null, true);
        this.change(null);
      }
      this.visible = false;
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
