import React, { useState } from 'react';

interface Props {
  onToggle: (isAnnual: boolean) => void;
}

const TogglerOferta: React.FC<Props> = ({ onToggle }) => {
  const [check, setCheck] = useState(false);

  const handleToggle = () => {
    const newState = !check;
    setCheck(newState);
    onToggle(newState);
  }

  return (
    <div className="form-check form-switch" id="toggler">
      <label className="form-check-label" htmlFor="switchCheckDefault">Pagament mensual</label>
      <input 
        className="form-check-input"
        type="checkbox" 
        role="switch"
        id="switchCheckChecked"
        checked={check}
        onChange={handleToggle}
      />
      <label className="form-check-label" htmlFor="switchCheckChecked">
        Pagament anual
      </label>
    </div>
  );
};

export default TogglerOferta;
