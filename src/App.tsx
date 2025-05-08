import React, { useState } from "react"; //aprendre bé que es cada cosa
import "./App.css";
import Navbar from "./components/Navbar";
import Portada from "./components/Portada";
import Targetes from "./components/Targetes";
import Preu from "./components/Preu";
import dataTargeta, { Targeta } from "./data-targetes"; //array i interficie

const App: React.FC = () => {
  const [countPags, setCountPags] = useState<number>(0);

  const [countLanguages, setCountLanguages] = useState<number>(0);

  const [selectedTargetaId, setSelectedTargetaId] = useState<number | null>(null);

  const handleSelectTargeta = (id: number, isSelected: boolean) => {
    if (isSelected) {
      setSelectedTargetaId(id);
    } else if (selectedTargetaId === id) {
      setSelectedTargetaId(null);
    }
  };

  const selectedTargeta = dataTargeta.find((targeta) => targeta.id === selectedTargetaId);
  const price = selectedTargeta ? selectedTargeta.price : 0;

  const printTargetes = dataTargeta.map((targeta: Targeta) => {
    return (
      <Targetes
        key={targeta.id}
        {...targeta}
        countPags={countPags}
        setCountPags={setCountPags}
        countLanguages={countLanguages}
        setCountLanguages={setCountLanguages}
        isChecked={selectedTargetaId===targeta.id}
        onSelectTargeta={handleSelectTargeta}
      />
    );
  });

  return (
    <>
      <Navbar />
      <Portada />
      {printTargetes}
      <Preu
        countPags={countPags}
        countLanguages={countLanguages}
        price={price}
      />
    </>
  );
};

export default App;



// coses a pulir:
// -que el counter sigue independent a cada targeta
// - que es reinicie si se'l deselecciona 
// -que se puguen seleccionar més d'un servei
