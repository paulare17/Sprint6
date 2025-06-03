import React, { useState } from "react";
import { Targeta } from "../dataTargetes"; //interficie

//extensió de la interfície de targeta
interface Props extends Targeta {
  countPags: number;
  setCountPags: (num: number) => void;
  countLanguages: number;
  setCountLanguages: (num: number) => void;
  isChecked: boolean;
  onSelectTargeta: (id: number, isSelected: boolean) => void;
  isAnnualPayment: boolean;
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
  isAnnualPayment
}) => {
  const [modalType, setModalType] = useState<"pages" | "languages" | null>(null);
 
  const selectedCheckBox = (e: React.ChangeEvent<HTMLInputElement>) => {
    onSelectTargeta(id, e.target.checked);
  };

  //funcions per sumar i restar pàgines i idiomes
  const addPags = () => countPags >= 0 && setCountPags(countPags + 1);

  const subtractPags = () => countPags > 0 && setCountPags(countPags - 1);

  const addLanguages = () =>
    countLanguages >= 0 && setCountLanguages(countLanguages + 1);

  const subtractLanguages = () =>
    countLanguages > 0 && setCountLanguages(countLanguages - 1);

  //funció per a que aparegui el modal (info)
  const getModalContent = () => {
    if (modalType === "pages") {
      return {
        title: "Nombre de pàgines",
        content: "Afegeix les pàgines que necessites per dur a terme el teu projecte. El cost de cada pàgina és de 30€ (s'aplica descompte del 20%)"
      };
    }
    return {
      title: "Nombre d'idiomes",
      content: "Afegeix els llenguatges que tindrà el teu projecte. El cost de cada llenguatge és de 30€ (s'aplica descompte del 20%)"
    };
  };

  const { title, content } = getModalContent();

  //càlcul del 20% de descompte
  const displayPrice = isAnnualPayment ? price * 0.8 : price;

  return (
    <section>
      <div className="targeta-container">
        <div className="targeta">
          <div className="targeta-info">
            <h5>{service}</h5>
            <div className="description">{description}</div>
          </div>
          <div className="targeta-preu">
            <h4>{displayPrice} €</h4>
            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                checked={isChecked}
                onChange={selectedCheckBox}
              />
              <label className="form-check-label">Afegeix</label>
            </div>
          </div>
        </div>
      </div>

      {/* desplegable, va FORA */}
      {id === 3 && (
        <div className="targeta-container">
          <div className={`web-options ${isChecked ? "visible" : ""}`}>
                  <div className="option">
              {/* icona ajuda */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                className="bi bi-info-circle"
                viewBox="0 0 16 16"
                onClick={() => setModalType("pages")}
                style={{ cursor: "pointer" }}
                data-bs-toggle="modal"
                data-bs-target="#infoModal"
              >
                <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16" />
                <path d="m8.93 6.588-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533L8.93 6.588zM9 4.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0" />
              </svg>
                    <label>Nombre de pàgines</label>
                    <div className="counter">
                <button onClick={subtractPags} disabled={!isChecked}>
                  -
                </button>
                <input value={countPags} readOnly />
                <button onClick={addPags} disabled={!isChecked}>
                  +
                </button>
                    </div>
                  </div>
                  <div className="option">
              {/* icona ajuda */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                className="bi bi-info-circle"
                viewBox="0 0 16 16"
                onClick={() => setModalType("languages")}
                style={{ cursor: "pointer" }}
                data-bs-toggle="modal"
                data-bs-target="#infoModal"
              >
                <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16" />
                <path d="m8.93 6.588-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533L8.93 6.588zM9 4.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0" />
              </svg>
                    <label>Nombre d'idiomes</label>
                    <div className="counter">
                <button onClick={subtractLanguages} disabled={!isChecked}>
                  -
                </button>
                <input value={countLanguages} readOnly />
                <button onClick={addLanguages} disabled={!isChecked}>
                  +
                </button>
              </div>
                    </div>
                  </div>
                </div>
              ) }
      {/* Modal de bootstrap (info) */}
      <div className="modal fade" id="infoModal" tabIndex={-1}>
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="infoModalLabel">{title}</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Tanca"></button>
            </div>
            <div className="modal-body">
              {content}
            </div>
            <div className="modal-footer">
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Targetes;
