import React, { useState, FormEvent } from "react";
import { Pressupost } from "dataPressupost";


interface Props {
  preuFinal: number;
  services: string;
  addPressupost: (pressupost: Pressupost) => void;
  onSort: (field: 'date' | 'name' | 'price') => void;
  sortOrder: 'asc' | 'desc';
  sortField: 'date' | 'name' | 'price';
  onSearch: (searchTerm: string) => void;
}

const TargetaPressupost: React.FC<Props> = ({ 
  preuFinal, 
  services, 
  addPressupost,
  onSort,
  sortOrder,
  sortField,
  onSearch
}) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    numPhone: "",
  });

//enviament del form
  
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault(); //evita reiniciar la pàgina

      //validació mail i telf

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const phoneRegex = /^\d{9,}$/;
if (!emailRegex.test(formData.email)){
  alert("El correu electrònic no està ben introduït")
return;
}
if (!phoneRegex.test(formData.numPhone)) {
  alert("El número de telèfon no té el format correcte")
 return;
} 

    const newPressupost: Pressupost = {
      id: pressupost.id,
      totalPrice: preuFinal,
      service: services,
      name: formData.name,
      email: formData.email,
      numPhone: formData.numPhone,
    };
    addPressupost(newPressupost);
    setFormData({ name: "", email: "", numPhone: "" });
  };

  //canvis del dom quan s'activen les cerques 
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    onSearch(e.target.value);
  };

  return (
    <section>
      <div className="targeta-container">
        <div className="targeta">
          <div className="targeta-info">
            <div className="container d-flex justify-content-between align-items-center">
            <h5>Demanar pressupost</h5>
              <div className="cercador">
                <div className="search-box">
                  <i className="bi bi-search"></i>
                  <input 
                    type="text" 
                    placeholder="Cercar pressupost..." 
                    onChange={handleSearch}
                  />
                </div>
                <i 
                  role="button" 
                  className={`bi ${sortField === 'date' && sortOrder === 'desc' ? 'bi-sort-down' : 'bi-sort-up'}`}
                  onClick={() => onSort('date')}
                >
                  Data
                </i>
                <i 
                  role="button" 
                  className={`bi ${sortField === 'name' && sortOrder === 'desc' ? 'bi-sort-down' : 'bi-sort-up'}`}
                  onClick={() => onSort('name')}
                >
                  Nom
                </i>
                <i 
                  role="button" 
                  className={`bi ${sortField === 'price' && sortOrder === 'desc' ? 'bi-sort-down' : 'bi-sort-up'}`}
                  onClick={() => onSort('price')}
                >
                  Import
                </i>
              </div>
            </div>
            <p>Preu total: {preuFinal}€</p>
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
                placeholder="Escrigui el seu nom"
              />
              <input
                type="text"
                name="numPhone"
                value={formData.numPhone}
                onChange={handleInputChange}
                required
                placeholder="Escrigui el seu número"
                />
    
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
                placeholder="Escrigui el seu mail"
              />
            
              <button type="submit" className="budget">Sol·licitar pressupost</button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TargetaPressupost;
