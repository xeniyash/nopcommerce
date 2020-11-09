describe("Basic serach field", () => {
  
  before(() => {
    cy.visit("/");
  });
  // Bug#1 - test should pass once bug is fixed
  // Information about test location should be added into the ticket
  it('should be visible on the main page with label: Search item', () => {
    cy.get("#small-search-box-form")
      .should("be.visible");
    cy.get("#small-searchterms")
      .attribute("aria-label")
      .should("contain", "Search item");
  });

  it("should show Alert with message 'Please enter some search keyword' if user is searching for less then 1 letter", () => {
  cy.get("#small-searchterms")
    .clear(); 
  const stub = cy.stub();
  cy.on("window:alert", stub)
  cy.get("input[type='submit']")
    .click()
    .then(() => {
      expect(stub.getCall(0)).to.be.calledWith("Please enter some search keyword");
    });
  });
  
  // Bug#2 - test should pass once bug is fixed 
  // Information about test location should be added into the ticket
  it("should show error if user is searching for 1 letter", () => {
    cy.get("#small-searchterms")
      .type("t");
    cy.get("input[type='submit']")
      .should("be.enabled")
      .click();
    cy.get(".warning")
      .text()
      .then((el) => {
        expect("Search term minimum length is 1 character", "Expected values are not match with actual values").contains(el);
      });
      // .should("contain", "Search term minimum length is 1 characters");
  });
})