const component = {
  template: `<vue-pikaday 
      v-model="date" 
      :options="options" 
      @focus="focus"
      @blur="blur"
      data-vue-pikaday 
      placeholder="Pick a date"
    ></vue-pikaday>`,
  methods: {
    focus() {
      this.$emit('focused');
    },
    blur() {
      this.$emit('blurred');
    }
  }
};

describe.only('Component', () => {
  before(() => cy.mount(component));

  it('renders custom attributes', () => {
    cy.get('[data-vue-pikaday]').should('have.attr', 'placeholder', 'Pick a date');
  });

  it('dispatches event listeners', () => {
    const focusSpy = cy.spy();
    const blurSpy = cy.spy();

    Cypress.vue.$on('focused', focusSpy);
    Cypress.vue.$on('blurred', blurSpy);

    cy.get('[data-vue-pikaday]').as('picker').click().then(() => {
      expect(focusSpy).to.be.calledOnce;
    });

    cy.get('@picker').blur().then(() => {
      expect(blurSpy).to.be.calledOnce;
    });
  });
});
