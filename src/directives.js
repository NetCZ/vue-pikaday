import _debounce from 'lodash/debounce';

function changeState(state, target, expression, instance = null) {
  target[expression] = state;
  instance = instance || target;
  state ? instance.show() : instance.hide();
}

export const VuePikadayVisible = {
  inserted(el, binding, VNode) {
    const instance = VNode.componentInstance;

    instance.onOpen = () => changeState(true, VNode.context, binding.expression, instance);

    instance.onClose = _debounce(() => changeState(false, VNode.context, binding.expression, instance), 100);
  },
  update(el, binding, VNode) {
    changeState(binding.value, VNode.componentInstance, binding.expression);
  }
};
