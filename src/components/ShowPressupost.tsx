import React from "react";
import { Pressupost } from "dataPressupost";

interface Props {
  pressupost: Pressupost;
}

const ShowPressupost: React.FC<Props> = ({ pressupost }) => {
  return (
    <section className="pressupost-card">
      <div className="pressupost-section">
        <p><strong>Nom: </strong> {pressupost.name}</p>
        <p><strong>Email: </strong> {pressupost.email}</p>
        <p><strong>Telèfon: </strong> {pressupost.numPhone}</p>
      </div>
      <div className="pressupost-section">
        <h2>Serveis contractats</h2>
        <ul>
          <li>{pressupost.service}</li>
        </ul>
      </div>
      <div className="pressupost-section">
        <h2>Preu total</h2>
        <p className="total-price">{pressupost.totalPrice}€</p>
      </div>
    </section>
  );
};

export default ShowPressupost;