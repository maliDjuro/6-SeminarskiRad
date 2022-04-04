import './styles/stilovi.scss';
import { useState, useEffect } from "react";
import UnosPoruka from './mojeKutije/UnosPoruka';
import SvePoruke from './mojeKutije/SvePoruke'
import UnosKorisnika from './mojeKutije/UnosKorisnika'


function App() {
  const color='#00FF00'
  const [korUnesen, setKorUnesen]=useState(false)
  const [korIme, setKorIme] = useState('Djuro')
  const [korBoja, setKorBoja] = useState('#00FF00')
//  korIme = unesiIme()
//  korBoja = unesiBoju()

  const [korisnik, setKorisnik] = useState({
    username: korIme,
    randomColor: korBoja
  })

  const [poruke, setPoruke] = useState ([])
  const [drone, setDrone] = useState()
  const [korisnici, setKorisnici] = useState()
// ovo je u public/index.html
//  <script src='https://cdn.scaledrone.com/scaledrone.min.js' type='text/javascript'></script>
useEffect(() => {
if(korUnesen){
  const drone = new window.Scaledrone("Ugs3Awd0UMrcGwF9", {
    data: korisnik,
  });
  setDrone(drone);
}
  // eslint-disable-next-line
}, [korUnesen]);


if (drone) {
  drone.on("open", (error) => {
    if (error) {
      // console.log("Pogreška u spajanju", error);
    } else {
    }

   

    const chatRoom = drone.subscribe("observable-room");

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
      const timeStamp = new Date()
      
      setPoruke((oldArray) => [
        ...oldArray,
        { text, username, userColor, chatUserID, korisnik, timeStamp },
      ]);
    });
  });
}

const onSendMessage = (poruka) => {
  if (poruka) {
    drone.publish({
      room: "observable-room",
      message: poruka,
    });
  }
  // console.log('Poruka', poruka);
};

function naPromjenu(e) {
  setKorIme(e.target.value);
  // console.log('promijenilo se ime');
}

function onSubmit(e) {
  e.preventDefault();
  setKorIme(e.target.value);
}


useEffect(()=>{
  setKorisnik({username: korIme, randomColor: korBoja})
  // console.log(korIme, korBoja);
}, [korUnesen,  korIme, korBoja])


return (
  <div className="App">
    <div className="App-header">
      <h1>Moja čat aplikatzia</h1>
      {/* {console.log(korUnesen)} */}
    </div>
{/* Ovdje unosimo ime i boju korisnika */}

    {
    (korUnesen===false) ?
    <>
      <div className="unosKor">
      <UnosKorisnika korIme={korIme} korBoja={korBoja} setKorIme={setKorIme} setKorBoja={setKorBoja} setKorUnesen={setKorUnesen} />
      </div>
      <div>
        {/* {console.log('unijo korisnika')} */}
      </div>
    </>
    :
    <>
      {/* <UnosKorisnika korIme={korIme} korBoja={korBoja}/> */}
      <SvePoruke poruke={poruke} korisnici={korisnici}/>
      <UnosPoruka onSendMessage={onSendMessage} />
    </>
}</div>);

}

export default App;
