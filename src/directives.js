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

    instance.onOpen = () => changeState(true, VNode.context, binding.expression, instance);

    instance.onClose = _debounce(() => changeState(false, VNode.context, binding.expression, instance), 100);
  },
  update(el: Object, binding: Object, VNode: Object) {
    changeState(binding.value, VNode.componentInstance, binding.expression);
  }
};
