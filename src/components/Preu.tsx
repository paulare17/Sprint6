import React from "react";
import { calculaPreuFinal } from "@utils/preufinal";

interface Props {
  countPags: number;
  countLanguages: number;
  price: number;
  isAnnualPayment: boolean;
}
//mostra en pantalla el preu (calculat a preufinal)
const Preu: React.FC<Props> = ({ countPags, countLanguages, price, isAnnualPayment }) => {
  const preuFinal = calculaPreuFinal(countPags, countLanguages, price, isAnnualPayment);
    return <h2 className="totalPrice">Preu total: {preuFinal} €</h2>;
};

export default Preu;
