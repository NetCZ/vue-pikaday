import VuePikaday from './component';

const VuePikadayPlugin = {
  install(app) {
    app.component(VuePikaday.name, VuePikaday);
  }
};

export default VuePikadayPlugin;
