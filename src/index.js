import VuePikaday from './component';
import { VuePikadayVisible } from './directives';

const Pikaday = {
  install(Vue) {
    Vue.component(VuePikaday.name, VuePikaday);
    Vue.directive('p-visible', VuePikadayVisible);
  }
};

if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.use(Pikaday);
}

export default Pikaday;
