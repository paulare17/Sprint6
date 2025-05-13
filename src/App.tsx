import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar";
import Portada from "./components/Portada";
import Targetes from "./components/Targetes";
import Preu from "./components/Preu";
import dataTargeta, { Targeta } from "./data-targetes";
import logo from "./assets/logo.webp"; // Importem el logo aquí

// Component per a la pàgina de benvinguda
const SplashMessage: React.FC<{ onClick: () => void }> = ({ onClick }) => {
  return (
    <div className="welcome-page">
      <img src={logo} className="welcome-logo" alt="logo" />
      <h1>Benvingut/da!</h1>
      <h3>Està a punt d'accedir als serveis oferits per Frontender.itacademy</h3>
      <h2>Faci click aquí per veure els nostres serveis:</h2>
      <button onClick={onClick}>Veure serveis</button>
    </div>
  );
};

const App: React.FC = () => {
  // Estat per controlar si es mostra la pàgina de benvinguda
  const [showSplash, setShowSplash] = useState(true);

  // Estats per a les targetes i el preu
  const [countPags, setCountPags] = useState(0);
  const [countLanguages, setCountLanguages] = useState(0);
  const [selectedTargetaId, setSelectedTargetaId] = useState<number | null>(null);

  // Funció per seleccionar/desseleccionar targetes
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

  // Calcular el preu
  const selectedTargeta = dataTargeta.find(
    (targeta) => targeta.id === selectedTargetaId
  );
  const price = selectedTargeta ? selectedTargeta.price : 0;

  // Renderitzar les targetes
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

  // Funció per tornar a la pàgina de benvinguda
  const handleShowSplash = () => {
    setShowSplash(true);
  };

  // Funció per mostrar el contingut principal
  const handleShowContent = () => {
    setShowSplash(false);
  };

  // Si showSplash és true, mostrem la pàgina de benvinguda
  if (showSplash) {
    return <SplashMessage onClick={handleShowContent} />;
  }

  // Altrament, mostrem el contingut principal
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
            </div>
          }
        />
      </Routes>
    </>
  );
};

export default App;