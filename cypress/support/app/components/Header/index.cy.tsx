import React from "react";
import { mount } from "cypress/react18";
import Header from "../../../../../app/components/MainContent/Header";

describe('<Header />', () => {
  it("should render header component", () => {
    mount(<Header />);

    cy.get('h1').contains('Golf Leaderboard');
  })
})
