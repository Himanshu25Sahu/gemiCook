import { createContext, useState } from "react";
import runChat from '../config/gemini.js'

export const Context=createContext();

const ContextProvider=(props)=>{


    const [input,setInput]=useState("");
    const [recentPrompt,setRecentPrompt]=useState("");
    const [previousPrompt,setPreviousPrompt]=useState([]);
    const [showResult,setShowResult]=useState(false);
    const [loading,setLoading]=useState(false);
    const [resultData,setResultData]=useState("");

    const delayPara=(index,nextword)=>{
        setTimeout(function (){
            setResultData(prev=>prev+nextword)
        },75*index)
    }

    const newChat=()=>{
        setLoading(false);
        setShowResult(false);
    }
    
    
    const [isBlue,setBlue]=useState(1);
    const setVeg=()=>{
        console.log("veg");
        if(isBlue===1){
           setBlue(0);
            
        }
        else{
           setBlue(1);

        }
        


    }
    const [min,setMin]=useState(false);
    const setmins=()=>{
        
        if(min===false){
           setMin(true);
            
        }
        else{
           setMin(false);

        }
        


    }

    const [hel,setHel]=useState(false);
    const SetHealth=()=>{
        if(hel){
            setHel(false);
        }
        else setHel(true);
    }

    const onSent=async (prompt)=>{
        try{

        
        setResultData("");
        setLoading(true);
        setShowResult(true);
        let response;

        let modifyInput="";
        if(input.length <=15){
            modifyInput="give the recipie for "+input;
        }
        else{
            modifyInput="one dish that can be made with the ingredients "+input+"and also give the recipie ";
        }

        if(isBlue===0){//veg enabled
            modifyInput+=", and the dish should be veg " 

        }
        if(min){
            modifyInput+=", and give the dish that can be made withing 20 minutes"
        }
        if(hel){
            modifyInput+=", and the dish should be healthy "
        }

        

        let newPrompt=modifyInput+` and add '<br/>' after every line or point `;
        if(prompt!==undefined){
            response=await runChat(newPrompt);
            setRecentPrompt(prompt)
        }
        else{
            setPreviousPrompt(prev=>[...prev,input])
            setRecentPrompt(input);
            response=await runChat(newPrompt)
        }
       let responseArray=response.split("**");
       let newResponse="";
       for(let i=0;i<responseArray.length;i++){
        
        if(i===0 || i%2 !==1){
            newResponse+=responseArray[i];
        }
        else{
            newResponse+="<b>"+responseArray[i]+"</b>";
        }
       }
       let newResponse2=newResponse.split("*").join("</br>");
    
       let newResponseArray=newResponse2.split(" ");
    
       for(let i=0;i<newResponseArray.length;i++){
        
        const nextword=newResponseArray[i];
        delayPara(i,nextword+" ");
       }
       setLoading(false);
       setInput("")
    }catch(e){
        console.log("api busy");
       
        newChat();
        setLoading(false);
        setShowResult(false);
        window.location.reload();
        alert("Please try again later!")
        console.log(e);
    }
    }

    const about=()=>{
        
        let about="**GemiCook* is your one-stop shop for whipping up delicious meals, whether you have a specific dish in mind or a fridge full of random ingredients. We take the guesswork out of cooking, empowering you to become a master chef in your own kitchen.**Dish Name Search:*. Craving a particular dish? Simply enter its name and we'll provide you with a detailed recipe, complete with instructions and ingredient list. **Ingredient-Based Discovery:*. Not sure what to make with the ingredients you have? No problem! List your available ingredients and we'll generate a variety of recipe options you can create with them.**Filter by Preference:* Refine your search results based on your dietary needs or cooking time constraints. We offer filters for:.**Veg:* Find vegetarian recipes.**Cooking Time:* Choose from quick and easy meals (under 20 minutes) to more elaborate dishes.**Health Focus:* Explore options for healthy meals."
        
        
        
        
        
        
        setResultData("")
        let newAboutArray=about.split(".").join("</br>");
        newAboutArray=newAboutArray.split("**").join("<b>")
        newAboutArray=newAboutArray.split("*").join("</b>")
        console.log(newAboutArray);
        newAboutArray=newAboutArray.split(" ");
        setShowResult(true);
        setLoading(true);
        for(let i=0;i<newAboutArray.length;i++){
        
            const nextword=newAboutArray[i];
            delayPara(i,nextword+" ");
           }
        setLoading(false);
        setInput("About");
        
    }

    
    const contextValue={
        previousPrompt,
        setPreviousPrompt,
        onSent,
        setRecentPrompt,
        recentPrompt,
        showResult,
        loading,
        resultData,
        input,
        setInput,
        newChat,
        
        setVeg,
        isBlue,
        min,
        setmins,
        hel,
        SetHealth,
        about
        
    }

    return(
        <Context.Provider value={contextValue}>
            {props.children}

        </Context.Provider>
    )
}

export default ContextProvider