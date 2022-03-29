import './App.css';
import { useState, useEffect } from "react";
import UnesiIme from './mojeKutije/UnesiIme';
import UnesiBoju from './mojeKutije/UnesiBoju';
import UnosPoruka from './mojeKutije/unosPoruka';
import Poruka from './mojeKutije/Poruka'
import UnosKorisnika from './mojeKutije/UnosKorisnika';


function App() {
  const [korIme, setKorIme] = useState('Djuro')
  const [korBoja, setKorBoja] = useState('#000000')
//  korIme = unesiIme()
//  korBoja = unesiBoju()

  const [poruke, setPoruke] = useState ([])
  const [drone, setDrone] = useState()
  const [korisnici, setKorisnici] = useState()
// ovo je u public/index.html
//  <script src='https://cdn.scaledrone.com/scaledrone.min.js' type='text/javascript'></script>
useEffect(() => {
  const drone = new window.Scaledrone("Ugs3Awd0UMrcGwF9", {
    data: korIme,
  });
  setDrone(drone);
  // eslint-disable-next-line
}, []);
if (drone) {
  drone.on("open", (error) => {
    if (error) {
      console.log("Pogreška u spajanju", error);
    }

   

    const chatRoom = drone.subscribe("mala-sobica");

    chatRoom.on("open", (error) => {
      if (error) {
        return console.error(error);
      }
      // Connected to room
    });

    chatRoom.on("data", (text, chatUser) => {
       setKorisnici(drone.clientId);
      

      const username = chatUser.clientData.username;
      const chatUserID = chatUser.id;
      const userColor = chatUser.clientData.randomColor
      
      setPoruke((oldArray) => [
        ...oldArray,
        { text, username, userColor, chatUserID, korIme },
      ]);
    });
  });
}

const zaSlanjePoruka = (poruka) => {
  if (poruka) {
    drone.publish({
      room: "mala-sobica",
      poruka,
    });
  }
};

return (
  <div className="App">
    <div className="App-header">
      <h1>Moja čat aplikatzia</h1>
    </div>
    <UnosKorisnika korIme={korIme} korBoja={korBoja}/>
    <Poruka poruke={poruke} korisnici={korisnici}/>
    <UnosPoruka zaSlanjePoruka={zaSlanjePoruka} />
  </div>
);
}

export default App;
