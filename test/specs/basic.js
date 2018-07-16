import moment from 'moment';

import VuePikaday from '../../dist/vue-pikaday.esm';

const component = {
  template: '<vue-pikaday v-model="date" :options="options" data-vue-pikaday></vue-pikaday>'
};

const options = {
  extensions: {
    plugins: [VuePikaday]
  },
  html: '<div id="app"></div><link rel="stylesheet" href="../../dist/vue-pikaday.min.css" />'
};

describe('Component', () => {
  before(() => cy.mount(component, options));

  it('renders', () => {
    cy.get('[data-vue-pikaday]');
    cy.get('.pika-single').should('not.be.visible');
  });

  it('focuses / blurs picker', () => {
    cy.get('[data-vue-pikaday]').focus();
    cy.get('.pika-single').should('be.visible');
    cy.get('[data-vue-pikaday]').blur();
    cy.get('.pika-single').should('not.be.visible');
  });

  it('selects current date via picker', () => {
    cy.get('[data-vue-pikaday]').focus();
    cy.get(`[data-day="${moment().date()}"] button`).click();
  });
});
