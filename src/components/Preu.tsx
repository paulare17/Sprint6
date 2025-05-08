import React from "react";

interface Props {
  countPags: number;
  countLanguages: number;
  price: number;
}
const Preu: React.FC<Props> = ({ countPags, countLanguages, price }) => {
  const preuFinal = (countPags + countLanguages) * 30 + price;

  return <h2>Preu total:{preuFinal} €</h2>;
};

export default Preu;
