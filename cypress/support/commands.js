//There are a lot of dropdowns with the same functionality but different data set
//so dpordown check can be used in many tests for different pages
Cypress.Commands.add("dropdownCheck", (webElement, expectedList) => {
  cy.get(webElement)
      .then(el => {
        const actualList = el.map((index, html) => Cypress.$(html).text()).get();
        expect(expectedList, "Expected values are not match with actual values").to.deep.equal(actualList);
      });
})
