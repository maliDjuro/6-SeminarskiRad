import React, { useState } from "react";


const UnosKorisnika = ({ korIme, korBoja, setKorIme, setKorBoja, setKorUnesen }) => {

  function onChange(e) {
    setKorIme(e.target.value);
  }

  function onColor(e) {
      setKorBoja(e.target.value)
  }


  

  return (
    <div className="Input">
      {/* <ColorPicker initialColor="#00FF00" onChange={(color => setKorBoja(color.hex))} size={300} /> */}
        <input
            onChange={(e) => onColor(e)}
            value={korBoja}
            type="color"
        />
        <br />
        <br />
        <input
          onChange={(e) => onChange(e)}
          value={korIme}
          type="text"
          placeholder="Unesi ime i stisni ENTER"
        />
        <button onClick={()=>setKorUnesen(true)}>Potvrdi</button>
    </div>
  );
};

export default UnosKorisnika;
