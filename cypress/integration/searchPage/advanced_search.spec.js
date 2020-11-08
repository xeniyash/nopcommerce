describe("Advineced search page", () => {
  
  before(() => {
    cy.visit("/search?q=lenovo");

  });
  
  it("should click on Advanced search checkbox", () => {
    cy.get("#adv")
      .check();
  });

  // //also as an option we can hardcode list of elements if we want to make sure that all items are present in the dropdown
  // Bug#1 - test should pass once bug is fixed
  // Information about test location should be added into the ticket
  it("should contain category dropdown with sorted items", () => {
    cy.get("label")
      .contains("Category:")
      .should("be.visible");
    cy.get("#cid > option")
      .then(el => {
      const unsortedItems = el.map((index, html) => Cypress.$(html).text()).get();
      const sortedItems = unsortedItems.slice().sort();
      expect(unsortedItems, "Items aren't sorted").to.deep.equal(sortedItems);
    });
  });

  // Bug#1 - test should pass once bug is fixed
  // Information about test location should be added into the ticket
  it("should contain Automatically search sub-categories checkbox", () => {
    cy.get("label")
      .contains("Automatically search-sub categories")
      .should("be.visible");
    cy.get("#isc")
      .check()
      .should('be.checked');
  });

  // Bug# - test should pass once bug is fixed
  // Information about test location should be added into the ticket
  it("should contain Manufacturer dropdown with values: [All, Apple, Lenovo, Nokia, Our brand]", () => {
    cy.get("label")
      .contains("Manufacturer:")
      .should("be.visible");
    const expectedListOfElements = ["All", "Apple", "Lenovo", "Nokia", "Our brand"];
    cy.dropdownCheck("#mid > option", expectedListOfElements);
  });

  it("should contain sertain values in the Sort by dropdown", () => {
    const expectedListOfElements = [
          "Position",
          "Name: A to Z",
          "Name: Z to A",
          "Price: Low to High",
          "Price: High to Low",
          "Created on"];
    cy.dropdownCheck("#products-orderby > option", expectedListOfElements);
  });

  it("should contain certain values in results per page dropdown", () => {
    const expectedNumberOfElementsPerPage = ["10", "20", "50", "100"];
    cy.dropdownCheck("#products-pagesize > option", expectedNumberOfElementsPerPage);
  });

  // TODO: Add tests for
  // - Search in product descriptions
  // - Test grid layout: Max 3 positions, Product name, rating, price and buttons are present on the page.
  // - Tests message if no product matched the search criterua: No results for <search_criteria>

})