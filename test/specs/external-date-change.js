import moment from 'moment';

const updatedDateCurrent = moment();
const updatedDateWeekForward = moment().add(7, 'days');

const component = {
  template: `<div>
      <vue-pikaday 
        v-model="date" 
        data-vue-pikaday
      ></vue-pikaday>
      <span>Internal date: <span data-internal-value>{{ date ? date : 'null' }}</span></span>
      <button @click="updateDateCurrent()" data-test="update-button-current">Update date to current</button>
      <button @click="updateDateWeekForward()" data-test="update-button-week">Update date to week from now</button>
      <button @click="clear()" data-test="clear-button">Clear</button>
    </div>`,
  methods: {
    updateDateCurrent() {
      this.date = updatedDateCurrent.toDate();
    },
    updateDateWeekForward() {
      this.date = updatedDateWeekForward.toDate();
    },
    clear() {
      this.date = null;
    }
  }
};

describe('Component', () => {
  before(() => cy.mount(component));

  it('updates Pikaday value from outside', () => {
    cy.get('[data-test="update-button-current"]').click();
    cy.get('[data-vue-pikaday]').as('picker').should('have.value', updatedDateCurrent.format('D MMM YYYY'));

    cy.get('[data-test="update-button-week"]').click();
    cy.get('@picker').should('have.value', updatedDateWeekForward.format('D MMM YYYY'));
  });

  it('handles removing characters', () => {
    cy.get('[data-test="update-button-current"]').click();

    cy.get('[data-vue-pikaday]').as('picker').type('{backspace}');

    cy.get('[data-internal-value]').should('contain', 'null');
  });

  it('handles invalid value typed in', () => {
    cy.get('[data-vue-pikaday]').as('picker').clear().type('invalid value').blur().should('have.value', '');

    cy.get('@picker').clear().type('13 Se').blur().should('have.value', '');
  });

  it('handles clearing value from outside', () => {
    cy.get('[data-test="update-button-current"]').click();
    cy.get('[data-test="clear-button"]').click();
    cy.get('[data-vue-pikaday]').as('picker').should('have.value', '');
  });
});
