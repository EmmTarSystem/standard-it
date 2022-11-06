import React, { useRef, useState } from 'react';
import './formulaire.css';
import Header from './Header';

const Formulaire = () => {
    //States 

    //Pour modifier l'affichage du titre normalisé
    const [textValue,setTextValue] = useState("");

    //Pour modifier l'affichage du bouton copie
    const [divResultValue,setDivResultValue] = useState("divResultHidden");

    //Pour modifier la notification du titre copié
    const [copiedNotifyClass,SetCopiedNotifyClass] = useState("pNotifyHidden");
    

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
   const textResultRef = useRef();


    // Comportement lorsque l'on tape dans l'input ou change la categorie
    //masque le précédent résultat si visible
    const onHandleChange = () =>{
        if (divResultValue === "divResultVisible") {
            setDivResultValue("divResultHidden");
        };
        if (copiedNotifyClass === "pNotifyVisible") {
            SetCopiedNotifyClass("pNotifyHidden");
        };
    };


    // Process de normalisatio

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
        
        
      //Set les STATES pour modifier l'affichage
        setTextValue(textResult);
        setDivResultValue("divResultVisible");
        
        //Copie dans le clipboard avec un delai d'affichage
        setTimeout(() => {
            var toCopy = textResultRef.current.innerHTML;
            navigator.clipboard.writeText(toCopy);
            SetCopiedNotifyClass("pNotifyVisible");
        }, 500);

        
        
       
    };


    //EFFACER

    const onClickClear = () => {
        //efface le contenu de l'input
        titreRef.current.value="";
        //set les states pour reactualiser l'affichage
        setTextValue("");
        setDivResultValue("divResultHidden");
        SetCopiedNotifyClass("pNotifyHidden");
                
    };
    console.log("chargement page")
    


    //Render
    return (
        <div className='main'>
            < Header />

            {/* <h2>Normalisez vos noms de documents</h2> */}

            {/* Form category */}
            <form action="">
                <label htmlFor="">CATEGORIE : </label>
                <select ref={selecteurRef} onChange={onHandleChange} name="" id="">
                    {categoryList.map((element, i) => {  
                        console.log(element + " " +i)
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

            {/* div resultat */}
            <div className={divResultValue}>
                <p className='nomNormalise'>NORMALISÉ :</p>
                <p ref={textResultRef} className="resultat">{textValue}</p>
                <p className={copiedNotifyClass}>Copié !</p>
            </div>
                        
        </div>

        
    );
};

export default Formulaire;