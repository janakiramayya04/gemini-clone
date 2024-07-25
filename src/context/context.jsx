import { createContext, useState } from "react";
import runChat from "../config/gemini";

export const Context = createContext();

const ContextProvider = (props) => {
  const [input, setInput] = useState("");
  const [recentPrompt, setRecentPrompt] = useState("");
  const [prevPrompts, setPrevPrompts] = useState([]);
  const [showResult, setShowResult] = useState(false);
  const [loading, setLoading] = useState(false);
  const [resultData, setResultData] = useState("");
  // console.log('ContextProvider - setInput:', typeof setInput); // Should log 'function'
  const delayPara = (index, nextWord) => {
    setTimeout(function () {
      setResultData((prev) => prev + nextWord);
    }, 75 * index);
  };
  const newChat=()=>{
    setLoading(false)
    setShowResult(false)
  }
  const onSent = async (prompt) => {
    setResultData("");
    setLoading(true);
    setShowResult(true);
    let response;
    if (prompt != undefined) {
      response = await runChat(prompt);
      setRecentPrompt(prompt);
    } else {
      setPrevPrompts((prev) => [...prev, input]);
      setRecentPrompt(input);
      response = await runChat(input);
    }
    let resposneArray = response.split("**");
    let newResponse = "";
    for (let i = 0; i < resposneArray.length; i++) {
      if (i === 0 || i % 2 !== 1) {
        newResponse += resposneArray[i];
      } else {
        newResponse += "<b>" + resposneArray[i] + "</b>";
      }
    }
    let newResponse2 = newResponse.split("*").join("</br>");
    // setResultData(newResponse2);
    let newresponseArray = newResponse2.split(" ");
    for (let index = 0; index < newresponseArray.length; index++) {
      const nextWord = newresponseArray[index];
      delayPara(index, nextWord + " ");
    }
    setLoading(false);
    setInput(""); // Clear input after sending
  };
  // onSent("what is the full form jsx")
  const contextValue = {
    onSent,
    prevPrompts,
    setPrevPrompts,
    setRecentPrompt,
    recentPrompt,
    showResult,
    loading,
    resultData,
    input,
    setInput,
    newChat,
  };
  return (
    <Context.Provider value={contextValue}>{props.children}</Context.Provider>
  );
};

export default ContextProvider;
