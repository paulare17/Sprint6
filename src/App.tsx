import React, {useState, useEffect} from "react"; //aprendre bé que es cada cosa
import "./App.css";
import Navbar from "./components/Navbar";
import Portada from "./components/Portada";
import Targetes from "./components/Targetes";
import Preu from "./components/Preu";
import dataTargeta, { Targeta, SelectedService } from "./data-targetes"; //array i interficie
// import { SelectedService } from "./hooks/SelectedService";

// const [count, setCount] = useState(0)

const App: React.FC = () => {
  const printTargetes = dataTargeta.map((targeta: Targeta) => {
    return <Targetes key={targeta.id} {...targeta} />;
  });

  return (
    <>
      <Navbar />
      <Portada />
      {printTargetes}
      {/* <Preu/> */}
    </>
  );
};

export default App;

