import React, { useRef, useState } from 'react';
import './formulaire.css';
import Result from './Result';



const Formulaire = (props) => {
    
    const categoryOrganisme = props.categoryOrganisme; 
    const nomenclature = props.nomenclatureOrganisme;
    const allMentionArray = props.mentionOrganisme;

    //Pour modifier l'affichage du titre normalisé ["texte resulat", "class de la div resultat"]
    const [resultValue,setResultValue] = useState(["","divResultHidden"]);


    //Mention
    
    const [mention,setMention] = useState("NP");


    var globalDivMentionClass="globalDivMentionClass"+mention;


    const onChangeMention = (e)=>{
        // Set la mention pour reactualisation et clear l'affichage
        setMention(e);
        onHandleChange();
    }


    
    //Variabilisation
    var textResult = "";
    const nbreMaxCaractere=60;
   
    //Reférence aux elements des formulaires
   const selecteurRef = useRef();
   const inputTitleRef = useRef();





    // Process de normalisation

    const onClickNormalize = () => {
       const categorySelected = selecteurRef.current.value;
        const titre = inputTitleRef.current.value;

        //traitement du format orthographe du titre
        var titreCorrect = titre;
                
        // Tableau motifs à rempalcer
        const correctionRef = [
            [/[éèêë]/gi,"e"],
            [/[àâä]/gi,"a"],
            [/[ç]/gi,"c"],
            [/[ïî]/gi,"i"],
            [/[ùûü]/gi,"u"],
            [/ /gi,"-"]
          ];
        //Correction
        for(let i = 0; i < correctionRef.length; i++){
            titreCorrect = titreCorrect.replace(correctionRef[i][0],correctionRef[i][1])
          };

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
        textResult = locDateFinale+"_"+mention+nomenclature+categorySelected+"_"+titreCorrect;      
      

        //Copie dans le clipboard 
        var toCopy = textResult;
        navigator.clipboard.writeText(toCopy);
        
        //Set les STATES pour modifier l'affichage
        setResultValue([textResult,"divResultVisible"]);
        
       
    };


    // Comportement lorsque l'on tape dans l'input ou change la categorie
    //masque le précédent résultat si visible
    const onHandleChange = () =>{
        if (resultValue[1] === "divResultVisible") {
            setResultValue(["","divResultHidden"])
            
        };
    };


    //EFFACER
    const onClickClear = () => {
        //clear uniquement si necessaire

        if (inputTitleRef.current.value !== "" || resultValue[1] !== "divResultHidden") {
            //efface le contenu de l'input
            inputTitleRef.current.value="";
            //set les states pour reactualiser l'affichage
            setResultValue(["","divResultHidden"]);
        }
        
        
        
    };

  
    console.log("chargement formulaire");

    

    //Render
    return (
        // Mention
        <div>
            <div className={globalDivMentionClass}>
                <form action="" >
                    {allMentionArray.map(
                    (element,i)=>{
                        return <div className='localDivMentionClass' key={i}>
                        <input type="radio" name='classification' onChange={()=>onChangeMention(element)} key={i} value={element} id={element} checked={element===mention}/>
                        <label htmlFor={element}>{element}</label>
                        </div>

                    }
                    )}
                </form>
            </div>
            {/* Formulaire category */}
            <form action="">
                <label htmlFor="">CATEGORIE : </label>
                <select ref={selecteurRef} onChange={onHandleChange} name="" id="">
                    {/* ? = si déjà monté ou non */}
                    {categoryOrganisme.map((element, i) => {  
                        return <option key={i} value={element}>{element}</option>    
                    })}
                </select>
            </form>
            {/* Input Title */}
            <p>
                <label htmlFor="">NOM : </label>
                <input className='titre' type="text" ref={inputTitleRef} onChange={onHandleChange} maxLength={nbreMaxCaractere} placeholder={nbreMaxCaractere + " caractères maximum / Pas de caractères spéciaux !"} autoFocus={true}/>
            </p>
            
            {/* Button*/}
            <p>
                <button onClick={onClickClear} className="btnClear">Effacer</button>
                <button onClick={onClickNormalize} className="btnNormalize">Normaliser</button>
            </p>

            {/* composant resultat */}
            < Result textToDisplay={resultValue[0]} divResultClass={resultValue[1]} />
                        
        </div>

        
    );
};

export default Formulaire;