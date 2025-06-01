import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar";
import Portada from "./components/Portada";
import Targetes from "./components/Targetes";
import Preu from "./components/Preu";
import dataTargeta, { Targeta } from "./dataTargetes";
import logo from "./assets/logo.webp";
import TargetaPressupost from "./components/TargetaPressupost";
import dataPressupost, { Pressupost } from "./dataPressupost";
import ShowPressupost from "./components/ShowPressupost";
import 'bootstrap-icons/font/bootstrap-icons.css';
import TogglerOferta from "./components/TogglerOferta";

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
  // Todos los estados al principio del componente
  const [showSplash, setShowSplash] = useState(true);
  const [countPags, setCountPags] = useState(0);
  const [countLanguages, setCountLanguages] = useState(0);
  const [dataPressupostState, setDataPressupostState] = useState<Pressupost[]>([]);
  const [selectedTargetes, setSelectedTargetes] = useState<{ [key: number]: boolean }>({});
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const [sortField, setSortField] = useState<'date' | 'name' | 'price'>('date');
  const [searchTerm, setSearchTerm] = useState("");
  const [isAnnualPayment, setIsAnnualPayment] = useState(false);

  const handleSelectTargeta = (id: number, isSelected: boolean) => {
    setSelectedTargetes((prev) => ({ ...prev, [id]: isSelected }));
  };

  const selectedTargetas = dataTargeta.filter(
    (targeta) => selectedTargetes[targeta.id]
  );
  const price = selectedTargetas.reduce((total, targeta) => total + targeta.price, 0);

  const preuFinal: number = isAnnualPayment 
    ? ((countPags + countLanguages) * 30 + price) * 0.8 
    : (countPags + countLanguages) * 30 + price;

  const addPressupost = (newPressupost: Pressupost) => {
    setDataPressupostState([...dataPressupostState, newPressupost]);
    setCountPags(0);
    setCountLanguages(0);
    setSelectedTargetes({});
    setIsAnnualPayment(false);
  }

  const handleSort = (field: 'date' | 'name' | 'price') => {
    if (field === sortField) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortOrder('asc');
    }
  };

  const handleSearch = (term: string) => {
    setSearchTerm(term.toLowerCase());
  };

  const handlePaymentToggle = (isAnnual: boolean) => {
    setIsAnnualPayment(isAnnual);
  };

  const filteredAndSortedPressupostos = [...dataPressupostState]
    .filter(pressupost => 
      pressupost.name.toLowerCase().includes(searchTerm) ||
      pressupost.email.toLowerCase().includes(searchTerm) ||
      pressupost.service.toLowerCase().includes(searchTerm)
    )
    .sort((a, b) => {
      let comparison = 0;
      if (sortField === 'date') {
        comparison = a.id - b.id;
      } else if (sortField === 'name') {
        comparison = a.name.localeCompare(b.name);
      } else if (sortField === 'price') {
        comparison = a.totalPrice - b.totalPrice;
      }
      return sortOrder === 'asc' ? comparison : -comparison;
    });

  const selectedServices = () => {
    return dataTargeta
      .filter((targeta) => selectedTargetes[targeta.id])
      .map((targeta) => targeta.service);
  };

  const printTargetes = dataTargeta.map((targeta: Targeta) => {
    return (
      <Targetes
        key={targeta.id}
        {...targeta}
        countPags={countPags}
        setCountPags={setCountPags}
        countLanguages={countLanguages}
        setCountLanguages={setCountLanguages}
        isChecked={selectedTargetes[targeta.id] || false}
        onSelectTargeta={handleSelectTargeta}
        isAnnualPayment={isAnnualPayment}
      />
    );
  });

  const handleShowSplash = () => {
    setShowSplash(true);
  };

  const handleShowContent = () => {
    setShowSplash(false);
  };

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
              <TogglerOferta onToggle={handlePaymentToggle} />
              {printTargetes}
              <Preu
                countPags={countPags}
                countLanguages={countLanguages}
                price={price}
              />
              <TargetaPressupost 
                preuFinal={preuFinal} 
                services={selectedServices()}
                addPressupost={addPressupost}
                onSort={handleSort}
                sortOrder={sortOrder}
                sortField={sortField}
                onSearch={handleSearch}
              />
              {filteredAndSortedPressupostos.map((pressupost: Pressupost) => (
                <ShowPressupost key={pressupost.id} pressupost={pressupost}/>
              ))}
            </div>
          }
        />
      </Routes>
    </>
  );
};

export default App;