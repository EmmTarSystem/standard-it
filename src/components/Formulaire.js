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
        console.log("Changement de la mention pour = " + e);
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
        console.log("clic normaliser")
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
            year = (locDateDuJour.getFullYear()),
            tempMonth = (locDateDuJour.getMonth() + 1),
            tempDay = (locDateDuJour.getDate());

        // traitement format 2 digits
        var finalMonth =(tempMonth < 10 ? "0" + tempMonth : tempMonth);
        var finalDay =(tempDay < 10 ? "0" + tempDay : tempDay);

        // simplification de la date
        var locDateFinale = ('' +   year + finalMonth + finalDay);


        //Ecriture résultat finale
        textResult = locDateFinale+"_"+mention+nomenclature+categorySelected+"_"+titreCorrect;      
      

        //Copie dans le clipboard 
        var toCopy = textResult;
        navigator.clipboard.writeText(toCopy);
        console.log("Text copié dans le clipboard = " + toCopy);
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
        console.log("Clic Effacer")
        if (inputTitleRef.current.value !== "" || resultValue[1] !== "divResultHidden") {
            //efface le contenu de l'input
            inputTitleRef.current.value="";
            //set les states pour reactualiser l'affichage
            console.log("Effacement effectué")
            setResultValue(["","divResultHidden"]);
        }else{
            console.log("Rien à effacer")
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