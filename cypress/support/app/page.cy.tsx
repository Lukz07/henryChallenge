import React from 'react';
import { mount } from "cypress/react18";
import Home from '../../../app/page';

describe('HOME', () => {
    it("show", () => {
        mount(<Home />);
    })
})