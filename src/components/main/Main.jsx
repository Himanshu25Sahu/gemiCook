import React, { useContext } from 'react'
import './Main.css'
import { FaUser } from "react-icons/fa";
import { FaCompass } from "react-icons/fa";
// import { TbPhotoUp } from "react-icons/tb";
import { IoSend } from "react-icons/io5";
import { Context } from '../../context/context';
import { TfiThought } from "react-icons/tfi";
 


const Main = () => {
    const {
        onSent,
        // setRecentPrompt,
        recentPrompt,
        showResult,
        loading,
        resultData,
        input,
        setInput,
        
        setVeg,
        isBlue,
        min,
        setmins,
        hel,
        SetHealth
        
        
    }=useContext(Context)

    async function handleCardClick(event) {
        // Check if clicked element is a card or a descendant of a card
        if (!event.target.closest('.card')) {
          return; // Do nothing if not a card or its descendant
        }
      
        const clickedCard = event.target.closest('.card');
      
        // Find the first paragraph element within the clicked card
        let clickedCardText = clickedCard.querySelector('h1').textContent;
        clickedCardText="give the recipie of any type of "+ clickedCardText +" food" 
        // recentPrompt()
        await onSent(clickedCardText);
        // setInput("")
        // console.log(clickedCardText); // Optional for debugging
      }
      
      const cardIcons = document.querySelectorAll('.card');
      cardIcons.forEach(icon => icon.addEventListener('click', handleCardClick));
      

  return (
    <>
    
        <div className="bg"></div>
        <div className="bg bg2"></div>
        <div className="bg bg3"></div>
    <div className='main'>
       

        <div className="main-bottom">
                <div className="search-box">
                    <input onChange={(e)=>setInput(e.target.value)}  type="text" placeholder='Search or Create a recipie!..' value={input}/>
                    <div>
                        {/* <TbPhotoUp className='input-icons' size={30}/> */}
                        <IoSend onClick={()=>onSent()}  className='input-icons' size={30}/>
                    </div>
                </div>
                <p className="bottom-info">
                    
                </p>

                <div className="dish-filter">
                    <button onClick={()=>setVeg()} className={isBlue?"v-no filter-buttons":"v-yes filter-buttons"}>Veg</button>
                    <button onClick={()=>setmins()} className={min?"min-yes filter-buttons":"min-no filter-buttons"}>20 mins</button>
                    <button onClick={()=>SetHealth()} className={hel?"hel-yes filter-buttons":"hel-no filter-buttons"}>Healthy</button>
                </div>
        </div>

        <div className="main-container">
            {
                
                !showResult?<>
                    <div className="greet" >
                <p><span>Hello!</span></p>
                <p>Make A Treat For Your Stomach!</p>

            </div>
            <div className="cards">
                <div className="card"  onClick={handleCardClick} id='indian'>
                    <h1>Indian</h1>
                    {/* <FaCompass size={30} className='card-icons' /> */}
                </div>
                <div className="card" id='chinease'  onClick={handleCardClick}>
                    <h1>Chinease</h1>
                    {/* <FaCompass size={30} className='card-icons'/> */}
                </div>
                <div className="card" id='mexican'  onClick={handleCardClick}>
                    <h1>Mexican</h1>
                    {/* <FaCompass size={30} className='card-icons'/> */}
                </div>
                
                
            </div>

                </>:<div className='result'>
                    <div className="result-title">
                        <FaUser size={20}/>
                        <p>{recentPrompt}</p>
                    </div>
                        <TfiThought size={28}/>
                    <div className="result-data">
                        {
                            loading?<div className='loader'>
                                <hr />
                                <hr />
                                <hr />

                            </div>:
                                <p dangerouslySetInnerHTML={{__html:resultData}}></p>
                        }
                    </div>

                </div>
            }


            
            

            
        </div>

    </div>
    </>
  )
}

export default Main
