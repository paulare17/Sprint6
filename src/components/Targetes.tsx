import React from "react";
import { Targeta } from "../data-targetes"; //interficie

//extensió de la interfície de targeta
interface Props extends Targeta {
  countPags: number;
  setCountPags: (num: number) => void;
  countLanguages: number;
  setCountLanguages: (num: number) => void;
  isChecked: boolean;
  onSelectTargeta: (id: number, isSelected: boolean) => void;
}

const Targetes: React.FC<Props> = ({
  id,
  service,
  description,
  price,
  countPags,
  countLanguages,
  setCountLanguages,
  setCountPags,
  isChecked,
  onSelectTargeta,
}) => {
 
  const selectedCheckBox = (e: React.ChangeEvent<HTMLInputElement>) => {
    onSelectTargeta(id, e.target.checked);
  };

  const addPags = () => countPags >= 0 && setCountPags(countPags + 1);

  const subtractPags = () => countPags >= 0 && setCountPags(countPags - 1);

  const addLanguages = () => countLanguages >= 0 && setCountLanguages(countLanguages + 1);

  const subtractLanguages = () => countLanguages >= 0 && setCountLanguages(countLanguages - 1);

  return (
    <section>
      <div className="targeta-container">
        <div className="targeta">
          <div className="targeta-info">
            <h5>{service}</h5>
            <p>{description}</p>
          </div>
          <div className="targeta-preu">
            <h4>{price} €</h4>
            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                checked={isChecked}
                onChange={selectedCheckBox}
              />
              <label className="form-check-label" >Afegeix</label>
              {/* desplegable al seleccionar: */}
              {isChecked && (
                <div className="additional-options">
                  <div className="option">
                    <label>Nombre de pàgines</label>
                    <div className="counter">
                      <button onClick={subtractPags}>-</button>
                      <input value={countPags} />
                      <button onClick={addPags}>+</button>
                    </div>
                  </div>
                  <div className="option">
                    <label>Nombre d'idiomes</label>
                    <div className="counter">
                      <button onClick={subtractLanguages}>-</button>
                      <input value={countLanguages} />
                      <button onClick={addLanguages}>+</button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Targetes;
