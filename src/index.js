import VuePikaday from './component';
import { VuePikadayVisible } from './directives';

const VuePikadayPlugin = {
  install(app) {
    app.component(VuePikaday.name, VuePikaday);
    app.directive('p-visible', VuePikadayVisible);
  }
};

export default VuePikadayPlugin;
