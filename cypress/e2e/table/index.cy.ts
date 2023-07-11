describe('<Table/>', () => {
  it('validate table', () => {
    cy.viewport(1100, 800);
    cy.visit('http://localhost:3000');

    //Table exxist
    cy.get('.leaderboard-table');

    //Tour Button exist
    cy.get('.tour-button').click();
    cy.get('.tour-filter a').first().click();

    //Season Button exist
    cy.get('.season-button').click();
    cy.get('.season-filter a').first().click();

    /*
      Table Header contains:
      - # in first column
      - NAME in second column
    */

    cy.get('thead tr:first-child').contains('#');
    cy.get('thead tr:nth-child(1)').contains('NAME');


    /* 
      Table Footer contains:
      - left arrow image
      - current page
      - last page
      - right arrow image
      - total items
    */

      cy.get('.table-footer a.arrow-left img').should('have.attr', 'src', '/arrow.svg');
      cy.get('.table-footer b').first().contains('1');
      cy.get('.table-footer b').last().contains('15');
      cy.get('.table-footer a.arrow-right img').should('have.attr', 'src', '/arrow.svg');
      cy.get('.table-footer .total-items').contains('150');
  })
})