import { createContext } from "react";
import uuid from "uuid";

export const defaultListContext = [
  {
    title: "Test item 1",
    checked: false,
    id: uuid(),
  },
  {
    title: "Test item 2",
    checked: true,
    id: uuid(),
  },
];

export const ListContext = createContext(defaultListContext);

export const ListProvider = ListContext.Provider;
