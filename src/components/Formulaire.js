import React, { useRef, useState } from 'react';
import './formulaire.css';
import Header from './Header';
import Result from './Result';

const Formulaire = () => {
    //States 

    //Pour modifier l'affichage du titre normalisé
    const [textValue,setTextValue] = useState(["","divResultHidden"]);
   

    //Array liste Catégorie
    const  categoryList = [
        "ACTIVITE","AIR","APPUI","BCOORD","BEG","BRAY","BRP","CAB","COAL","DEF","DHGS",
        "DIVERS","DLA","DLF","DODCM","DPEL","GEND","MARINE","MEMOIRE","SIC","TERRE",
        "G01","G02","G03","G04","G05","G06","G07","G08","G09","G10","G11","G12","G13","G14"
    ];

    //Variabilisation
    var textResult = "";
    const nbreMaxCaractere=60;
   
    //Reférence aux elements des formulaires
   const selecteurRef = useRef();
   const titreRef = useRef();





    // Process de normalisation

    const onClickNormalize = () => {
       const categorie = selecteurRef.current.value;
        const titre = titreRef.current.value;

        //traitement du format orthographe du titre
        var titreCorrect = titre;
                
        // Ecriture des motifs à rempalcer
        var regAccentA = new RegExp('[àâä]', 'gi'),
        regAccentE = new RegExp('[éèêë]', 'gi'),
        regCedille = new RegExp('[ç]', 'gi'),
        regAccentI = new RegExp('[ïî]', 'gi'),
        regAccentU = new RegExp('[ùûü]', 'gi'),
        regSpace = new RegExp(' ', 'gi');
        //Correction
        titreCorrect = titreCorrect.replace(regAccentA,"a");
        titreCorrect = titreCorrect.replace(regAccentE,"e");
        titreCorrect = titreCorrect.replace(regCedille,"c");
        titreCorrect = titreCorrect.replace(regAccentI,"i");
        titreCorrect = titreCorrect.replace(regAccentU,"u");
        titreCorrect = titreCorrect.replace(regSpace,"-");

         // 1 Lettre majuscule
         titreCorrect = titreCorrect.charAt(0).toUpperCase() + titreCorrect.slice(1);




        //Traitement du format date 
        var locDateDuJour = new Date(),
            locAnnee = (locDateDuJour.getFullYear()),
            locMois = (locDateDuJour.getMonth() + 1),
            locJour = (locDateDuJour.getDate());

        // traitement  du zero pour les dates inferieurs a 10
        if (locMois < 10) {
            locMois = ('0' + locMois);
        };

        if (locJour < 10) {
          locJour = ('0' + locJour);
        };

        // simplification de la date
        var locDateFinale = ('' + locAnnee + locMois + locJour);


        //Ecriture résultat finale
        textResult = locDateFinale+"_NP_EDG_P30_"+categorie+"_"+titreCorrect;      
      

        //Copie dans le clipboard 
        var toCopy = textResult;
        navigator.clipboard.writeText(toCopy);
        
        //Set les STATES pour modifier l'affichage
        setTextValue([textResult,"divResultVisible"]);
        
       
    };


    // Comportement lorsque l'on tape dans l'input ou change la categorie
    //masque le précédent résultat si visible
    const onHandleChange = () =>{
        if (textValue[1] === "divResultVisible") {
            setTextValue(["","divResultHidden"])
            
        };
    };


    //EFFACER
    const onClickClear = () => {
        //efface le contenu de l'input
        titreRef.current.value="";
        //set les states pour reactualiser l'affichage
        setTextValue(["","divResultHidden"]);
        
    };

  


    //Render
    return (
        <div className='main'>
            < Header />

            {/* Form category */}
            <form action="">
                <label htmlFor="">CATEGORIE : </label>
                <select ref={selecteurRef} onChange={onHandleChange} name="" id="">
                    {categoryList.map((element, i) => {  
                        return <option key={i} value={element}>{element}</option>    
                    })}
                </select>
            </form>
            {/* Input Title */}
            <p>
                <label htmlFor="">NOM : </label>
                <input className='titre' type="text" ref={titreRef} onChange={onHandleChange} maxLength={nbreMaxCaractere} placeholder={nbreMaxCaractere + " caractères maximum / Pas de caractères spéciaux !"} autoFocus=""/>
            </p>
            
            {/* Button*/}
            <p>
                <button onClick={onClickClear} className="btnClear">Effacer</button>
                <button onClick={onClickNormalize} className="btnNormalize">Normaliser</button>
            </p>

            {/* composant resultat */}
            < Result toto={textValue[0]} divResultClass={textValue[1]} />
                        
        </div>

        
    );
};

export default Formulaire;