// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add("login", (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This is will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })

import _mergeWith from 'lodash/mergeWith';
import _isObject from 'lodash/isObject';

import mountVue from 'cypress-vue-unit-test';

Cypress.Commands.add('mount', (component, options) => {
  const specIframe = window.parent.document.querySelector('.aut-iframe');
  const iframeDocument = specIframe.contentDocument || specIframe.contentWindow.document;
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

  mountVue(component, options)();
});
