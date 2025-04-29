import React from "react";
import {Targeta} from "../data-targetes"; //interficie

const Targetes: React.FC<Targeta> = ({ id, service, description, price }) => { //preguntar a chat q es millor
  // console.log({ id, service, description, price });
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
                <input className="form-check-input" type="checkbox" id={`${id}`} />
                <label className="form-check-label" htmlFor="seo">
                  Afegeix
                </label>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  export default Targetes;