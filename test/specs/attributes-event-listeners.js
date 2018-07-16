import VuePikaday from '../../dist/vue-pikaday.esm';

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

const options = {
  extensions: {
    plugins: [VuePikaday]
  },
  html: '<div id="app"></div><link rel="stylesheet" href="../../dist/vue-pikaday.min.css" />'
};

describe.only('Component', () => {
  before(() => cy.mount(component, options));

  it('renders custom attributes', () => {
    cy.get('[data-vue-pikaday]').should('have.attr', 'placeholder', 'Pick a date');
  });

  it('dispatches event listeners', () => {
    const focusSpy = cy.spy();
    const blurSpy = cy.spy();

    Cypress.vue.$on('focused', focusSpy);
    Cypress.vue.$on('blurred', blurSpy);

    cy.get('[data-vue-pikaday]').focus().then(() => {
      expect(focusSpy).to.be.calledOnce;
    });

    cy.get('[data-vue-pikaday]').blur().then(() => {
      expect(blurSpy).to.be.calledOnce;
    });
  });
});
