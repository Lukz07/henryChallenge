import React from "react";
import { mount } from "cypress/react18";
import Navbar from "../../../../../app/components/Navbar";

describe("<Navbar>", () => {
  it("should render component", () => {
    mount(<Navbar/>);

    cy.get('.link-logo').should('have.attr', 'href', 'https://www.soyhenry.com/');
    cy.get('.link-logo img').should('have.attr', 'src', '/logo.svg');
  })
})