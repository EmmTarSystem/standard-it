import React, { useRef, useState, useEffect } from 'react';
import axios from 'axios';
import './selectOrganisme.css'

const SelectOrganisme = ({setOrganismeData}) => {


// recupere le json



  const [allJsonData,setAllJsonData] = useState([]);

  const selecteurRef = useRef();

    // Recupere les infos dans la bdd json
    useEffect(() => {
        axios.get("./dataBase.json").then((res)=> {
            setAllJsonData(res.data);
            
        })
        
    },[]);



    //action lors du choix de l'organisme
    const onChooseOrganisme = ()=>{
        var userChoice = selecteurRef.current.value
        console.log("Organisme choisit : " + userChoice);

        //set les cookies selon le choix
        localStorage.setItem("standard-it organisme",userChoice);


        //recupère les data de l'organisme
        const organismeData = allJsonData.filter(function (i) {
            return i.organisme ===userChoice;


        });

        

        //Set le state du parent avec les nouvelles data afin de recharger le parent
        //Passe par le props pour upload vers le parent
        setOrganismeData(organismeData)
    }


    return (

        <div>
            

            {/* Form category */}
            <form action="">
                <label htmlFor="">ORGANISME : </label>
                <select ref={selecteurRef} name="" id="">
                    {/* ? = si déjà monté ou non */}
                    {allJsonData?.map((e,i) =>{ return <option key={i} value={e.organisme}>{e.organisme}</option>})}
                </select>
                
            </form>
            <p>
                <button onClick={onChooseOrganisme}>Selectionner</button>
            </p>
            
        </div>
    );
};





export default SelectOrganisme;