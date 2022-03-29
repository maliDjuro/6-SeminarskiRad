import './App.css';
import { useState, useEffect } from "react";
import unesiIme from './mojeKutije/unesiIme';
import unesiBoju from './mojeKutije/unesiBoju';


function App() {
  const [korIme, setKorIme] = useState({
    korIme=unesiIme()
  });
  const [korBoja, setKorBoja] = useState({
    korBoja=unesiBoju()
  })
  const [poruke, setPoruke] = useState ([])
  const [drone, setDrone] = useState()
  const [korisnici, setKorisnici] = useState()
// ovo je u public/index.html
//  <script src='https://cdn.scaledrone.com/scaledrone.min.js' type='text/javascript'></script>
useEffect(() => {
  const drone = new window.Scaledrone("Ugs3Awd0UMrcGwF9", {
    data: user,
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
       setUsers(drone.clientId);
      

      const username = chatUser.clientData.username;
      const chatUserID = chatUser.id;
      const userColor = chatUser.clientData.randomColor
      
      setMessages((oldArray) => [
        ...oldArray,
        { text, username, userColor, chatUserID, user },
      ]);
    });
  });
}

const onSendMessage = (message) => {
  if (message) {
    drone.publish({
      room: "mala-sobica",
      message,
    });
  }
};

return (
  <div className="App">
    <div className="App-header">
      <h1>Moja čet aplikatzia</h1>
    </div>
    <Message poruke={poruke} korisnici={korisnici}/>
    <Input onSendMessage={onSendMessage} />
  </div>
);
}

export default App;
