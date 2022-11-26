import './components/app.css';
import Formulaire from './components/Formulaire';
import Footer from './components/Footer';
import Header from './components/Header';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import SelectOrganisme from './components/SelectOrganisme';

function App() {


//Verification presence choix organisme (cookies)

const [organismeData,setOrganismeData] = useState([]);
var cookiesOrganisme=localStorage.getItem("standard-it organisme");

// Recupere les infos dans la bdd json
useEffect(() => {
 
  //la base n'est chargé uniquement si présence cookie + base non chargé
  //Récupère directement les data de l'organisme définit dans les cookies
  if (cookiesOrganisme!==null && organismeData.length ===0) {
    axios.get("./dataBase.json").then((res)=> {
      setOrganismeData(res.data.filter(function (i) {
        return i.organisme ===cookiesOrganisme;
    }));
    });
  }
},[]);



//RENDER


//1 uniquement les cookies de présent
if (cookiesOrganisme!==null && organismeData.length ===0) {
  console.log("Uniquement cookies présent : "+ cookiesOrganisme  +". Chargement des datas")
  return (
    <div>
      {/* Vide attend que la base se charge dans le use effect pour lancer la phase 2 */}
    </div>
  )
}



//2 cookie et data déjà stockés
if (cookiesOrganisme!==null  && organismeData.length > 0) {
  //appel le formulaire avec les DATAS
  console.log("cookies + data ok");
  

  return (
    <div>
      <div className='main'>
        <Header />
        <Formulaire categoryOrganisme={organismeData[0].categories} nomenclatureOrganisme={organismeData[0].nomenclature} mentionOrganisme={organismeData[0].mention}/>
      </div>
      
      <Footer />
    </div>
  )
}



//3  = First connection
if (cookiesOrganisme===null){
  console.log("pas d'organisme de définit / Affiche Choix Organisme")
  return(
    <div>
      <div className='main'>
        <Header />
        {/* le props permet de recupere les éléments depuis le child */}
        <SelectOrganisme setOrganismeData={setOrganismeData} />
      </div>
      
      <Footer />
    </div>
  )
}

  
}
export default App;
