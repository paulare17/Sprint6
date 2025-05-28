import React, { useState, FormEvent } from "react";
import dataPressupost, { Pressupost } from "data-pressupost";
import Preu from "./Preu";

interface Props {
  preuFinal: number;
  services: string;
  addPressupost: (pressupost: Pressupost) => void;
}

const TargetaPressupost: React.FC<Props> = ({ preuFinal, services, addPressupost }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    numPhone: "",
  });

  //enviament del form
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault(); //evita reiniciar la pàgina
    const newPressupost: Pressupost = {
      id: Date.now(),
      totalPrice: preuFinal,
      service: services.join(", ") || "Cap servei seleccionat",
      name: formData.name,
      email: formData.email,
      numPhone: formData.numPhone,
    };
    addPressupost(newPressupost);
    setFormData({ name: "", email: "", numPhone: "" });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <section>
      <div className="targeta-container">
        <div className="targeta">
          <div className="targeta-info">
            <h5>Demanar pressupost</h5>
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
