import React, { useRef, useState } from 'react';
import './formulaire.css';
import Header from './Header';
import Result from './Result';



const Formulaire = (props) => {
    
    const categoryOrganisme = props.categoryOrganisme; 
    const nomenclature = props.nomenclatureOrganisme;


    //Pour récuperer les élément dans la bdd
    // const [allData,setAllData] = useState({});

    //Pour modifier l'affichage du titre normalisé ["texte resulat", "class de la div resultat"]
    const [resultValue,setResultValue] = useState(["","divResultHidden"]);



    // Recupere les infos dans la bdd json
    // useEffect(() => {
    //         axios.get("./dataBase.json").then((res)=> {
    //             setAllData(res.data[0]);
    //         })
            
    // },[]);
    
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
        textResult = locDateFinale+nomenclature+categorySelected+"_"+titreCorrect;      
      

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
        <div className='main'>
            < Header />

            {/* Form category */}
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