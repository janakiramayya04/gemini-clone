import React, { useContext } from "react";
import "./Main.css";
import { assets } from "../../assets/assets";
import { Context } from "../../context/context";
// import { faTruckLoading } from "@fortawesome/free-solid-svg-icons";
// import he from 'he';
const Main = () => {
  const { onSent, recentPrompt, showResult, resultData, setInput, input,loading } = useContext(Context);
  // const escapedResultData=he.encode(resultData)
  return (
    <div className="main">
      <div className="nav">
        <p>Gemini</p>
        <img src={assets.user_icon} alt="" />
      </div>
      <div className="main-container">
        {!showResult
        ?
        <>
        <div className="greet">
          <p>
            <span>Hello, JANAKI RAMAYYA</span>
          </p>
          <p>How can I help you today?</p>
        </div>
        <div className="cards">
          <div className="card">
            <p>Help me plana a game night with 5 friends for under $100</p>
            <img src={assets.compass_icon} alt="" />
          </div>
          <div className="card">
            <p>Create a list of power phrases for my resume</p>
            <img src={assets.bulb_icon} alt="" />
          </div>
          <div className="card">
            <p>Create a list of power phrases for my resume</p>
            <img src={assets.message_icon} alt="" />
          </div>
          <div className="card">
            <p>Help me craft an OOO message based on a few details</p>
            <img src={assets.code_icon} alt="" />
          </div>
        </div>
        </>:
        <div className="result">
          <div className="result-title">
            <img src={assets.user_icon} alt="" />
            <p>{recentPrompt}</p>
          </div>
          <div className="result-data">
          <img src={assets.g_gemini_icon} alt="" />
            {loading ? <div className="loader">
              <hr />
              <hr />
              <hr />
            </div>:<p dangerouslySetInnerHTML={{ __html: resultData }}></p>}
            
          </div>
        </div>
        }
        
        <div className="main-bottom">
          <div className="search-box">
            <input
              onChange={(e)=>setInput(e.target.value)}
              value={input}
              type="text"
              placeholder="Enter a prompt here"
            />
            <div>
              <img src={assets.gallery_icon} alt="" />
              <img src={assets.mic_icon} alt="" />
              {input ?<img
                onClick={() => onSent()}
                src={assets.send_icon}
                alt=""
              />:null}
            </div>
          </div>
          <p className="bottom-info">
            Gemini may display inaccurate info, including about people, so
            double-check its responses. <a>Your privacy and Gemini Apps</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Main;
