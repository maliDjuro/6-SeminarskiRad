import React, { useRef, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";

const SvePoruke = ({ poruke, korisnici }) => {
  // console.log(poruke, korisnici)
  function invertColor(hex) {
    if (hex.indexOf('#') === 0) {
        hex = hex.slice(1);
    }
    // convert 3-digit hex to 6-digits.
    if (hex.length === 3) {
        hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
    }
    if (hex.length !== 6) {
        throw new Error('Invalid HEX color.');
    }
    // invert color components
    var r = (255 - parseInt(hex.slice(0, 2), 16)).toString(16),
        g = (255 - parseInt(hex.slice(2, 4), 16)).toString(16),
        b = (255 - parseInt(hex.slice(4, 6), 16)).toString(16);
    // pad each with zeros and return
    return '#' + padZero(r) + padZero(g) + padZero(b);
}

function padZero(str, len) {
    len = len || 2;
    var zeros = new Array(len).join('0');
    return (zeros + str).slice(-len);
}

  return (
    <div>
      <div className="Lista-poruka">
        {poruke.map((poruka) => (
          <div key={poruke.indexOf(poruka)} className={(poruka.chatUserID === korisnici) ? "Messages-message currentMember" : "Messages-message"}>
            <span
              className="avatar"
            />
            {/* {console.log(poruka.userColor,':', invertColor(poruka.userColor))} */}
            <div className="Sadrzaj-poruke" style={{ backgroundColor: `${poruka.userColor}`, color: `${invertColor(poruka.userColor)}`, border: `2px dotted`, borderRadius: '10px'}}>
              <div className="korisnik">{poruka.username}:</div>
              <div className="timestamp">{poruka.timeStamp.getHours()}:{poruka.timeStamp.getMinutes()}</div>
              <div className="tekst">{poruka.text}</div>
            </div>
            
          </div>
        ))}
      </div>
    </div>
  );
};

export default SvePoruke;
