import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar";
import Portada from "./components/Portada";
import Targetes from "./components/Targetes";
import Preu from "./components/Preu";
import dataTargeta, { Targeta } from "./data-targetes";
import logo from "./assets/logo.webp";
import TargetaPressupost from "./components/TargetaPressupost";
import dataPressupost, { Pressupost } from "./data-pressupost";
import ShowPressupost from "./components/ShowPressupost";

// pàgina de benvinguda
const SplashMessage: React.FC<{ onClick: () => void }> = ({ onClick }) => {
  return (
    <div className="welcome-page">
      <img src={logo} className="welcome-logo" alt="logo" />
      <h1>Benvingut/da!</h1>
      <h3>Està a punt d'accedir als serveis oferits per Frontender.itacademy</h3>
      <h2>Faci click aquí per veure els nostres serveis:</h2>
      <button onClick={onClick} className="welcome-button">Veure serveis</button>
    </div>
  );
};

const App: React.FC = () => {
  // state per controlar si es mostra la pàgina de benvinguda
  const [showSplash, setShowSplash] = useState(true);

  // pagines
  const [countPags, setCountPags] = useState(0);

  //llenguatges
  const [countLanguages, setCountLanguages] = useState(0);

  const [dataPressupost, setDataPressupost] = useState<Pressupost[]>([])

  //quina targeta està seleccionada
  const [selectedTargetaId, setSelectedTargetaId] = useState<number | null>(null);
  const handleSelectTargeta = (id: number, isSelected: boolean) => {
    if (isSelected) {
      setSelectedTargetaId(id);
      setCountLanguages(0);
      setCountPags(0);
    } else if (selectedTargetaId === id) {
      setSelectedTargetaId(null);
      setCountLanguages(0);
      setCountPags(0);
    }
  };

  
  // preu
  const selectedTargeta = dataTargeta.find(
    (targeta) => targeta.id === selectedTargetaId
  );
  const price:number = selectedTargeta ? selectedTargeta.price : 0;

  //càlcul del preu, repetit, veure què fem
  const preuFinal:number = (countPags + countLanguages) * 30 + price;

  //mostrar targeta dels pressupostos
  const addPressupost = (newPressupost: Pressupost) => {
    setDataPressupost([...dataPressupost, newPressupost]);
    //netejar al fer click
    setCountPags(0);
    setCountLanguages(0);
    setSelectedTargetaId(null);
  }


  // map les targetes
  const printTargetes = dataTargeta.map((targeta: Targeta) => {
    return (
      <Targetes
        key={targeta.id}
        {...targeta}
        countPags={countPags}
        setCountPags={setCountPags}
        countLanguages={countLanguages}
        setCountLanguages={setCountLanguages}
        isChecked={selectedTargetaId === targeta.id}
        onSelectTargeta={handleSelectTargeta}
      />
    );
  });

  //map dels pressupostos
  const printBudget = dataPressupost.map((pressupost: Pressupost) => {
    return (
      <ShowPressupost key={pressupost.id} pressupost={pressupost}/>
    );
  });

  // tornar a la pàgina de benvinguda (true)
  const handleShowSplash = () => {
    setShowSplash(true);
  };

  // pagina principal (false)
  const handleShowContent = () => {
    setShowSplash(false);
  };

  // if showSplash == true: pg benvinguda
  if (showSplash) {
    return <SplashMessage onClick={handleShowContent} />;
  }

  return (
    <>
      <Navbar onResetSplash={handleShowSplash} />
      <Routes>
        <Route
          path="/"
          element={
            <div>
              <Portada />
              {printTargetes}
              <Preu
                countPags={countPags}
                countLanguages={countLanguages}
                price={price}
              />
              <TargetaPressupost 
                preuFinal={preuFinal} 
                services={selectedTargeta?.service}
                addPressupost={addPressupost}
              />
              {printBudget}
            </div>
          }
        />
      </Routes>
    </>
  );
};

export default App;