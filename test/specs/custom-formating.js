import moment from 'moment';

function customFormat(date, format) {
  const start = moment(date, format).day(1);
  const end = moment(date, format).day(5);
  return `${ start.format(format) } - ${ end.format(format) }`;
}

const component = {
  template: `<vue-pikaday 
      v-model="date" 
      :options="options"
      data-vue-pikaday 
    ></vue-pikaday>`,
  data() {
    return {
      options: {
        pickWholeWeek: true,
        toString: customFormat,
        parse: () => moment(this.date)
      }
    };
  }
};

describe('Custom formatting', () => {
  before(() => cy.mount(component));

  it('renders input value using custom formatter', () => {
    cy.get('[data-vue-pikaday]').as('picker').focus();
    cy.get(`[data-day="${ moment().date() }"] button`).click();

    cy.get('@picker').should('have.value', customFormat(moment().date(), 'D MMM YYYY'));
  });
});
