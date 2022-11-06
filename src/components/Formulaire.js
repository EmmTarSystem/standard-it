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
    
    


    //Render
    return (
        <div className='main'>
            < Header />

            {/* <h2>Normalisez vos noms de documents</h2> */}

            {/* Form category */}
            <form action="">
                <label htmlFor="">CATEGORIE : </label>
                <select ref={selecteurRef} onChange={onHandleChange} name="" id="">
                    <option value="ACTIVITE">ACTIVITE</option>
                    <option value="AIR">AIR</option>
                    <option value="APPUI">APPUI</option>
                    <option value="BCOORD">BCOORD</option>
                    <option value="BEG">BEG</option>
                    <option value="BRAYO">BRAY</option>
                    <option value="BRP">BRP</option>
                    <option value="CAB">CAB</option>
                    <option value="COAL">COAL</option>
                    <option value="DEF">DEF</option>
                    <option value="DHGS">DHGS</option>
                    <option value="DIVERS">DIVERS</option>
                    <option value="DLA">DLA</option>
                    <option value="DLF">DLF</option>
                    <option value="DODCM">DODCM</option>
                    <option value="DPEL">DPEL</option>
                    <option value="GEND">GEND</option>
                    <option value="MARINE">MARINE</option>
                    <option value="MEMOIRE">MEMOIRE</option>
                    <option value="SIC">SIC</option>
                    <option value="TERRE">TERRE</option>
                    <option value="G01">G01</option>
                    <option value="G02">G02</option>
                    <option value="G03">G03</option>
                    <option value="G04">G04</option>
                    <option value="G05">G05</option>
                    <option value="G06">G06</option>
                    <option value="G07">G07</option>
                    <option value="G08">G08</option>
                    <option value="G09">G09</option>
                    <option value="G10">G10</option>
                    <option value="G11">G11</option>
                    <option value="G12">G12</option>
                    <option value="G13">G13</option>
                    <option value="G14">G14</option>
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


            <div className={divResultValue}>
                <p className='nomNormalise'>NORMALISÉ :</p>
                <p ref={textResultRef} className="resultat">{textValue}</p>
                <p className={copiedNotifyClass}>Copié !</p>
            </div>
            

        </div>
    );
};

export default Formulaire;