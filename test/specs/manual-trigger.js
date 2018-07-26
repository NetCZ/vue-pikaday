import VuePikaday from '../../dist/vue-pikaday.esm';

const component = {
  template: `<div>
      <vue-pikaday 
        v-model="date" 
        :options="options" 
        v-p-visible="visible"
        data-vue-pikaday 
      ></vue-pikaday>
      <button @click="visible = !visible" data-test="manual">Manual</button>
    </div>`,
  data: {
    visible: false
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

  it('shows / hide via external trigger', () => {
    cy.get('[data-test="manual"]').click();
    cy.get('.pika-single').should('be.visible');

    cy.get('[data-test="manual"]').click();
    cy.get('.pika-single').should('not.be.visible');
  });
});
