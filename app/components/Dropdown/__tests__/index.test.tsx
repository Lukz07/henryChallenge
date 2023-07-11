import React from "react";
import '@testing-library/jest-dom/extend-expect';
import { RenderResult, fireEvent, render } from '@testing-library/react';
import { prettyDOM } from "@testing-library/react";
import Dropdown from "../index";
import { act } from "react-dom/test-utils";

describe('<Dropdown />', () => {
  let component:  RenderResult, HTMLElement;
  let title: string = 'test';
  let handleOnChange = jest.fn();
  const list = [
    {
      text: "option 1",
      id: 15
    },
    {
      text: "option 2",
      id: 4
    },
    {
      text: "option 3",
      id: 2
    }
  ];

  beforeEach(() => {
    component = render(<Dropdown title={title} 
                                  onChange={handleOnChange} 
                                  options={list}
                        />);
  })
  
  it('render title test for component', () => {
    component.getByText(title);
  });

  it('renders list of options', async () => {    
    const button = component.container.querySelector('button') as Element;

    fireEvent.click(button);

    await act(async () => {
      component.getByText('option 1');
      component.getByText('option 2');
      component.getByText('option 3');
    })
  })
})