import React, {useState} from "react";
import { Targeta } from "../data-targetes"; //interficie

const Targetes: React.FC<Targeta> = ({ id, service, description, price }) => {

    const [isChecked, setIsChecked] = useState<boolean>(false);

    const selectedCheckBox = (e: React.ChangeEvent<HTMLInputElement>) => {
      setIsChecked(e.target.checked);
    }

    const [countPags, setCountPags] = useState<number>(0)

    const [countLanguages, setCountLanguages] = useState<number>(0)

    function addPags() {
      setCountPags(prevCount => prevCount + 1)
    }

    function subtractPags() {
      setCountPags(prevCount => prevCount - 1)
    }
    
    function addLanguages() {
      setCountLanguages(prevCount => prevCount + 1)
    }

    function subtractLanguages() {
      setCountLanguages(prevCount => prevCount - 1)
    }



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
                id={id}
                checked={isChecked}
                onChange = {selectedCheckBox}
              />
              <label className="form-check-label">Afegeix</label>
        {/* desplegable al seleccionar: */}
        {isChecked && (
          <div className="additional-options">
            <div className="option">
              <label>Nombre de pàgines</label>
              <div className="counter">
              <button onClick={subtractPags}>-</button>
                <input placeholder="0" value={countPags}/>
                <button onClick={addPags}>+</button>
              </div>
            </div>
            <div className="option">
              <label>Nombre d'idiomes</label>
              <div className="counter">
              <button onClick={subtractLanguages}>-</button>
                <input placeholder="0" value={countLanguages}/>
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