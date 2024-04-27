import logo from './logo.svg';
import './App.css';
import { useEffect, useRef, useState } from "react";
import {
  faCircle,
  faCircleArrowUp,
  faListUl,
  faPlusCircle,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { getCurrentUser } from "./services/auth.service";
import { getMessages, getResponse } from "./services/openai.service";

function App() {

  const chat = useRef(null);
  const [prompt, setPrompt] = useState("");
  const [conversation, setConversation] = useState([]);
  const [updateScrollView, setUpdateScrollView] = useState(0);
  const [updateConversation, setUpdateConversation] = useState(0);
  const submitBtn = useRef(null);

  const handleSubmit = () => {
    if (prompt.length === 0 && conversation.length % 2 === 1) return;
    const conv = conversation;
    conv.push(prompt);
    setConversation(conv);
    setUpdateScrollView(Math.random());
    
      // getResponse(prompt, res.projectId, res.convId)
      //   .then((res) => {
      //     setConversation([...conv, res.data.openai_response]);
      //     setUpdateScrollView(Math.random());
      //   })
      //   .catch(function (error) {
      //     console.error(error);
      //   });
    
    setPrompt("");
  };

  useEffect(() => {
    chat?.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [updateScrollView]);


  const handlePrompt = (e) => {
    if (e.key === "Enter" && prompt.length > 0) {
      if (conversation.length % 2 === 1) {
        e.preventDefault();
        return;
      }
      console.log(prompt);
      const conv = conversation;
      conv.push(prompt);
      setConversation(conv);
      setUpdateScrollView(Math.random());
      
      getResponse(prompt)
      .then((res) => {
        setConversation([...conv, res.answer]);
        setUpdateScrollView(Math.random());
      })
      .catch(function (error) {
        console.error(error);
      });

     

      setPrompt("");
    }
  };

  const handleQuickPrompt = (target) => {
    
    let prompt = target.innerHTML;
    if (conversation.length % 2 === 1) {
      // e.preventDefault();
      return;
    }
    console.log(prompt);
    const conv = conversation;
    conv.push(prompt);
    setConversation(conv);
    setUpdateScrollView(Math.random());
    
    getResponse(prompt)
    .then((res) => {
      setConversation([...conv, res.answer]);
      setUpdateScrollView(Math.random());
    })
    .catch(function (error) {
      console.error(error);
    });

   

    setPrompt("");
  }


  return (
    <div className="relative h-full max-w-5xl pt-10 mx-auto">

      <div
        className="pb-40 overflow-y-auto md:pb-28 text-neutral-700"
        ref={chat}
      >
        <div>
          <img src='https://joinhorizons.com/wp-content/uploads/2022/09/logo-black.svg' alt='svg' className='w-48 mx-auto mt-48' />
          <p className='mt-10 text-4xl font-bold mb-5 text-center'>How can I assist you today?</p>
          <div className='flex gap-5 my-10 justify-between'>
            <div className='p-8 bg-white border-2 rounded-md w-[32%] bg-[#f8f8f8] hover:cursor-pointer' onClick={(e) => handleQuickPrompt(e.target)}>
              Can a PEO in China hire both local and foreign nationals to work in China?
            </div>
            <div className='p-8 bg-white border-2 rounded-md w-[32%] bg-[#f8f8f8] hover:cursor-pointer' onClick={(e) => handleQuickPrompt(e.target)}>
              Can a China Employer of Record hire staff on my behalf in different cities in China?
            </div>
            <div className='p-8 bg-white border-2 rounded-md w-[32%] bg-[#f8f8f8] hover:cursor-pointer' onClick={(e) => handleQuickPrompt(e.target)}>
              What responsibilities do I have regarding my employee(s) in China?
            </div>
          </div>
        </div>  
        {conversation.map((conv, index) => (
          <div key={index}>
            {index % 2 === 0 ? (
              <div className="flex gap-5 my-5 w-full p-5 bg-white rounded-xl ">
                
                  <img src='user2.png' alt='chatbot' className='size-10'/>
                
                <div className="">
                  <p className='font-bold text-xl'>Pierre Pradier</p>
                  {conv}
                  <span className="hidden">{updateConversation}</span>
                </div>
              </div>
            ) : (

              <div className="flex gap-5 my-5 w-full p-5 bg-[#f8f8f8] rounded-xl ">
                  <img src='chatbot.png' alt='chatbot' className='size-12'/>
                <div className="">
                  <p className='font-bold text-xl'>Horizons AI:</p>
                  {conv}
                  <span className="hidden">{updateConversation}</span>
                </div>
              </div>
            )}
          </div>
        ))}
        {conversation.length % 2 === 1 && (
          <div>
            {/* <div className="pl-5 text-xl">
              <FontAwesomeIcon icon={faListUl} className="size-5" />
              &nbsp;&nbsp;Answer
            </div> */}
            <div className="w-full p-5 animate-pulse">
              <FontAwesomeIcon icon={faCircle} className="size-5" />
            </div>
          </div>
        )}
      </div>
      <div className="fixed bottom-0 flex flex-col w-full h-30 md:h-20">
        <div className="relative flex max-w-5xl mr-8 h-14 md:mb-5">
          <input
            className="w-full pl-16 text-md border-2 border-gray-300 rounded-[50px] ring-2 ring-[rgb(232,232,229)] items-center trans"
            onKeyDown={handlePrompt}
            placeholder="Ask follow up..."
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
          />

          <FontAwesomeIcon
            icon={faCircleArrowUp}
            className={`absolute my-3 ml-5 size-8 right-5 hover:text-[#9ddae2] hover:cursor-pointer 
          `}
            onClick={handleSubmit}
            ref={submitBtn}
          />

          <FontAwesomeIcon
            icon={faPlusCircle}
            className="absolute my-3 ml-5  size-8  text-[#d0d0d0] hover:text-[#505252] hover:cursor-pointer"
          />
        </div>
      </div>
    </div>
  );
}

export default App;
