import React, { useState } from "react";

const UnosPoruka = ({ onSendMessage }) => {
  const [unosTeksta, setUnosTeksta] = useState("");

  function onChange(e) {
    setUnosTeksta(e.target.value);
  }

  function onSubmit(e) {
    e.preventDefault();
    setUnosTeksta("");
    onSendMessage(unosTeksta);
  }

  return (
    <div className="Input">
      <form onSubmit={(e) => onSubmit(e)}>
        <input
          onChange={(e) => onChange(e)}
          value={unosTeksta}
          type="text"
          placeholder="Unesi poruku i stisni ENTER"
        />
        <button>Pošalji</button>
      </form>
    </div>
  );
};

export default UnosPoruka;
