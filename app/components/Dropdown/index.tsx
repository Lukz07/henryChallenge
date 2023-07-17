"use client"

import React, { Fragment, useEffect, useRef, useState } from "react";
import { Menu, Transition } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";

export interface Option {
  text: string,
  id: number
}

interface Dropdown {
  title: string,
  options?: Array<Option> | null,
  onChange: () => void,
}

const classNames = (...classes: string[]) => {
  return classes.filter(Boolean).join(' ');
};

const Dropdown = ({
  title,
  options,
  onChange
}: Dropdown) => {

  const [titleText, setTitleText] = useState<string | null | undefined>(title);
  const [titleId, setTitleId] = useState<number>(0)

  useEffect(() => {
    onChange();
  }, [titleText])

  const handleOptionClick = (e: React.MouseEvent, text: string, id: number) => {
    e.preventDefault();
    
    setTitleText(text);
    setTitleId(id)
  }

  const buildOption = ({text, id}: Option, index: number) => {
    return (
      <div className="py-1" key={index}>
        <Menu.Item>
          {({active, close}) => (
            <a 
              href="#"
              className={classNames(
                active ? 'bg-gray-100 text-gray-900 selected' : 'text-gray-700',
                'block px-4 py-2 text-sm'
              )}
              onClick={(e) => {
                handleOptionClick(e, text, id);
                close();
              }}
              data-id={`${title.toLowerCase()}-${id}`}
            >
              {text}
            </a>
          )}
        </Menu.Item>
      </div>
    )
  }

  return (
    <Menu as="div" className={`${title.toLowerCase()}-filter relative inline-block text-left mr-3`}>
      <div>
        <Menu.Button className={`${title.toLowerCase()}-button inline-flex w-full justify-center tracking-tightest gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50`} data-id={`${titleId}`}>
          {titleText}
          <ChevronDownIcon className="-mr-1 h-5 w-5 text-gray-900" aria-hidden="true" />
        </Menu.Button>
      </div>

      <Transition 
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute left-0 z-10 mt-2 w-40 origin-top-left divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          {
            options ? 
              options?.map((item, index) => buildOption(item, index))
              :
              buildOption({text: title, id: 1}, 0)
          }
        </Menu.Items>
      </Transition>
    </Menu>
  )
}

export default Dropdown;