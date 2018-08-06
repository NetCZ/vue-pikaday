import _mergeWith from 'lodash/mergeWith';
import _isObject from 'lodash/isObject';

import mountVue from 'cypress-vue-unit-test';

import VuePikaday from '../../../dist/vue-pikaday.esm';

import standaloneHTML from './standalone.html';

const mode = `${Cypress.env('mode') || 'esm'}`;

const options = {
  extensions: {
    plugins: [VuePikaday]
  },
  html: '<div id="app"></div><link rel="stylesheet" href="../../../dist/vue-pikaday.min.css" />'
};

Cypress.Commands.add('mount', (component) => {
  const appIframe = window.parent.document.querySelector('.aut-iframe');
  const iframeDocument = appIframe.contentDocument || appIframe.contentWindow.document;
  const componentData = component.data || {};

  component.data = function () {
    return _mergeWith({
      date: null,
    }, componentData, {
      options: {
        // we have to specify container to put picker to, otherwise it would be rendered in wrong frame
        container: iframeDocument.querySelector('body')
      }
    }, (res, obj) => {
      if (_isObject(res) && _isObject(obj)) {
        return Object.assign({}, res, obj);
      }
      return res;
    });
  };

  if (mode === 'standalone') {
    component.el = '#app';

    // inject component specification into appIframe so it can be used to instantiate Vue component
    appIframe.contentWindow._component = component;
    // inject Cypress object to appIframe for tests consistency
    appIframe.contentWindow.Cypress = Cypress;

    const componentHTML = '<script>Cypress.vue = new Vue(window._component)</script>';

    iframeDocument.write(standaloneHTML);
    iframeDocument.write(componentHTML);
    iframeDocument.close();
  } else {
    mountVue(component, options)();
  }
});
