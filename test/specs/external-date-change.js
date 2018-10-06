import moment from 'moment';

const updatedDateCurrent = moment();
const updatedDateWeekForward = moment().add(7, 'days');

const component = {
  template: `<div>
      <vue-pikaday 
        v-model="date" 
        data-vue-pikaday 
      ></vue-pikaday>
      <button @click="updateDateCurrent()" data-test="update-button-current">Update date to current</button>
      <button @click="updateDateWeekForward()" data-test="update-button-week">Update date to week from now</button>
    </div>`,
  methods: {
    updateDateCurrent() {
      this.date = updatedDateCurrent.toDate();
    },
    updateDateWeekForward() {
      this.date = updatedDateWeekForward.toDate();
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
});
