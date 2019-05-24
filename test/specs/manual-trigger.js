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
  data() {
    return {
      visible: false
    };
  }
};

describe('Manual trigger', () => {
  before(() => cy.mount(component));

  it('shows / hide via external trigger', () => {
    cy.get('[data-test="manual"]').click();
    cy.get('.pika-single').should('be.visible');

    cy.get('[data-test="manual"]').click();
    cy.get('.pika-single').should('not.be.visible');
  });
});
