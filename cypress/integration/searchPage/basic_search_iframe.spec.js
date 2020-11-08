describe("Basic serach field", () => {

  const getIframeBody = () => {
  // get the iframe > document > body
  // and retry until the body element is not empty
  return cy
    .get('iframe')
    .its('0.contentDocument.body').should('not.be.empty')
    // wraps "body" DOM element to allow
    // chaining more Cypress commands, like ".find(...)"
    // https://on.cypress.io/wrap
    .then(cy.wrap)
  };
  
  before(() => {
    cy.visit("https://frontend.nopcommerce.com/");  
  })
  it('should be visible on the main page with label: Search item', () => {
    getIframeBody()
      .find("#small-search-box-form")
      .should("be.visible");
    getIframeBody()
      .find("#small-searchterms")
      .attribute("aria-label")
      .should("contain", "Search item");
  })

  it("should show error if user is searching for less or equal to 1 letter", () => {
    getIframeBody()
      .find("#small-searchterms")
      .type("t");
    getIframeBody()
      .find("input[type='submit']")
      .click();
  })
})