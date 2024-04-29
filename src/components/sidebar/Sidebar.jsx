import React, { useContext, useState } from "react";
import "./Sidebar.css";
import { MdMenuBook } from "react-icons/md";
import { FaPlus } from "react-icons/fa";
import { FaRegMessage } from "react-icons/fa6";
import { FaQuestion } from "react-icons/fa";
import { FaHistory } from "react-icons/fa";
import { IoSettings } from "react-icons/io5";
import { Context } from "../../context/context";


const Sidebar = () => {
  const [extend,setExtend]=useState(false);
  const {onSent,previousPrompt,setRecentPrompt,newChat,about}=useContext(Context)
  

  const loadPrompt=async(prompt)=>{
    setRecentPrompt(prompt);
    await onSent(prompt)
  }
  
  return (
    <div className="sidebar">
      <div className="top">
        
        <MdMenuBook className="sidebar-icons menu" size={40} onClick={()=>setExtend(prev=>!prev)}/>
        
        <div onClick={()=>newChat()} className="new-chat">
        
            <FaPlus className="sidebar-icons" size={30}/>
          
          {extend?<p>New Chat</p>:null}
        </div>

        {extend?
        <div className="recent">
        <p className="recent-title">Recents</p>
        {previousPrompt.map((item,index)=>{
          return(

        <div onClick={()=>loadPrompt(item)} className="recent-entry">
          <FaRegMessage  size={30}/>
          <p>{item.slice(0,18)}</p>
          {/* <span className="option">*</span> */}
        </div>
          )
        })}
      </div>:null
      
      }
        
      </div>
      <div className="bottom">

        
        <div className="bottom-item recent-entry">
          <FaQuestion className="sidebar-icons" size={30} onClick={()=>about()}/>
          {extend?<p>Help</p>:null}
        </div>
        
        
      </div>
    </div>
  );
};

export default Sidebar;
