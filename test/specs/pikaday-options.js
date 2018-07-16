import moment from 'moment';

import VuePikaday from '../../dist/vue-pikaday.esm';

const component = {
  template: `<vue-pikaday 
      v-model="date" 
      :auto-default="true"
      :options="options" 
      data-vue-pikaday 
    ></vue-pikaday>`,
  data: {
    options: {
      format: 'YYYY/MM/DD',
      minDate: moment().toDate(),
      maxDate: moment().add(7, 'days').toDate()
    }
  }
};

const options = {
  extensions: {
    plugins: [VuePikaday]
  },
  html: '<div id="app"></div><link rel="stylesheet" href="../../dist/vue-pikaday.min.css" />'
};

describe.only('Component', () => {
  before(() => cy.mount(component, options));

  it('have current date filled by default', () => {
    cy.get('[data-vue-pikaday]').should('have.value', moment().format('YYYY/MM/DD'));
  });

  it('have custom display format', () => {
    const date = moment().add(1, 'day');

    cy.get('[data-vue-pikaday]').focus();
    cy.get(`[data-day="${date.date()}"] button`).click();
    cy.get('[data-vue-pikaday]').should('have.value', date.format('YYYY/MM/DD'));
  });

  it('restricts dates selection to current week', () => {
    cy.get('[data-vue-pikaday]').focus();
    cy.get(`[data-day="${moment().subtract(1, 'day').date()}"]`).should('have.class', 'is-disabled');

    cy.get('[data-vue-pikaday]').focus();
    cy.get(`[data-day="${moment().add(8, 'days').date()}"]`).should('have.class', 'is-disabled');

    const plus5Days = moment().add(5, 'days');

    cy.get('[data-vue-pikaday]').focus();
    cy.get(`[data-day="${plus5Days.date()}"]`).should('not.have.class', 'is-disabled');

    cy.get(`[data-day="${plus5Days.date()}"] button`).click();
    cy.get('[data-vue-pikaday]').should('have.value', plus5Days.format('YYYY/MM/DD'));
  });
});
