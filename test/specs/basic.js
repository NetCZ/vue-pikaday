import moment from 'moment';

const component = {
  template: '<vue-pikaday v-model="date" :options="options" data-vue-pikaday></vue-pikaday>'
};

describe('Basic', () => {
  before(() => cy.mount(component));

  it('renders', () => {
    cy.get('[data-vue-pikaday]').should('be.visible');
    cy.get('.pika-single').should('not.be.visible');
  });

  it('focuses / blurs picker', () => {
    cy.get('[data-vue-pikaday]').as('picker').focus();
    cy.get('.pika-single').should('be.visible');
    cy.get('@picker').blur();
    cy.get('.pika-single').should('not.be.visible');
  });

  it('selects current date via picker', () => {
    cy.get('[data-vue-pikaday]').focus();
    cy.get(`[data-day="${ moment().date() }"] button`).click();
  });
});
