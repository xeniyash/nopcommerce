describe("Main page", () => {
  
  before(() => {
    cy.visit("/");
  });
  
  it('should contain Logo', () => {
    cy.get("a")
      .find("img")
      .should("have.attr", "src")
      .should("include", "logo.png");
  });

})