//càlcul del preu amb les ofertes, pàgines i llenguates

export function calculaPreuFinal(countPags: number, countLanguages: number, price: number, isAnnualPayment: boolean) {
  let preuFinal = (countPags + countLanguages) * 30 + price;
  if (isAnnualPayment) {
    preuFinal = preuFinal * 0.8;
  }
  return preuFinal;
}