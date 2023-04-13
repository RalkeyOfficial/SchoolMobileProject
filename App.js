import { useState } from "react";
import { registerRootComponent } from "expo";
import { ListProvider, defaultListContext } from "./src/context/List";
import Home from "./src/Home";

export default function App() {
  const [list, setList] = useState(defaultListContext);

  return (
    <ListProvider value={[list, setList]}>
      <Home />
    </ListProvider>
  );
}

registerRootComponent(App);
