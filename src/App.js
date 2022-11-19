import React from 'react';
import Formulaire from './components/Formulaire';
import Footer from './components/Footer';
import './components/app.css';

const App = () => {
  
  //Traitement localStorage
  localStorage.setItem("organisme","EDG")
  var organisme = localStorage.getItem("organisme");

  console.log(organisme);

    
   
return(
  <div>
    <Formulaire />
    <Footer />
  </div>
)


}
export default App;
        
