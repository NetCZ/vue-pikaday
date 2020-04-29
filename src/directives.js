//@flow

import _debounce from 'lodash/debounce';

function changeState(state: boolean, target: Object, expression: string, instance: Object | null = null) {
  target[expression] = state;
  instance = instance || target;
  state ? instance.show() : instance.hide();
}

export const VuePikadayVisible = {
  inserted(el: Object, binding: Object, VNode: Object) {
    const instance: Object = VNode.componentInstance;

    instance.onOpen = () => _debounce(() => changeState(true, VNode.context, binding.expression, instance), 100);

    instance.onClose = _debounce(() => changeState(false, VNode.context, binding.expression, instance), 100);
  },
  update(el: Object, binding: Object, VNode: Object) {
    _debounce(() => changeState(binding.value, VNode.componentInstance, binding.expression), 100)();
  }
};
