import logo from './logo.svg';
import './App.css';
import { useEffect, useRef, useState } from "react";
import {
  faCircle,
  faCircleArrowUp,
  faEdit,
  faListUl,
  faPlusCircle,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { getCurrentUser } from "./services/auth.service";
import { getMessages, getResponse, trainDocument } from "./services/openai.service";
import Sidebar from './components/Sidebar';
import { SnackbarProvider, enqueueSnackbar } from 'notistack';
function App() {

  const chat = useRef(null);
  const [prompt, setPrompt] = useState("");
  const [document, setDocument] = useState("");
  const [uploading, setUploading] = useState(false);
  const [conversation, setConversation] = useState([]);
  const [updateScrollView, setUpdateScrollView] = useState(0);
  const [updateConversation, setUpdateConversation] = useState(0);
  const [updateMode, setUpdateMode] = useState(0);
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

  const uploadDocument = () => {
    if( document.length < 1 ) {
      enqueueSnackbar('Type your document!')
      return;
    }
    setUploading(true);
    trainDocument(document)
      .then((res) => {
        console.log(res.success);
        if( res.success ) {
          enqueueSnackbar('Uploaded successfully!')
          setUploading(false);
        }
      })
      .catch(function (error) {
        console.error(error);
        setUploading(false);
      });
  }

  return (
    <div className="relative h-full max-w-5xl pt-10 mx-auto">
      <SnackbarProvider />

      <div className={`z-0 hidden max-h-max md:block`}>
        <Sidebar setUpdateMode={setUpdateMode}/>
      </div>

      <div
        className="pb-40 overflow-y-auto md:pb-28 text-neutral-700"
        ref={chat}
      >
            <div>
              
              <img src='https://joinhorizons.com/wp-content/uploads/2022/09/logo-black.svg' alt='svg' className='w-48 mx-auto mt-48' />

          {
            updateMode == 0 ? 
            <div>
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
            :
            <div className='mt-10 mx-auto gap-3'>
              <p className='pb-3 font-bold'>Upload your own document</p>
              <div className="relative flex mr-8 h-80 md:mb-5 w-full">
                
                <textarea
                  type='textarea'
                  className="w-full pl-5 text-md border-2 border-gray-300 rounded-[5px] ring-2 ring-[rgb(232,232,229)] items-center trans py-3"
                  placeholder="Type text here..."
                  value={document}
                  onChange={(e) => setDocument(e.target.value)}
                />
              </div>
              <div className='flex justify-center'>  
              <button type="button" className="w-48 text-center justify-center inline-flex items-center px-4 py-2 font-semibold leading-6 text-sm shadow rounded-md text-white bg-indigo-500 hover:bg-indigo-400 transition ease-in-out duration-150 " disabled="" onClick={() => uploadDocument()}>
                  { uploading ? 
                    <div className='flex'>
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Uploading...
                    </div>
                : <div>Upload</div> }
              </button>                
              </div>
            </div>
        }

        </div>  
        {conversation.map((conv, index) => (
          <div key={index} className={`${updateMode == 0 ? "block" : "hidden"}`}>
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
      <div className={`fixed bottom-0 flex flex-col w-full h-30 md:h-20  ${updateMode == 0 ? "block" : "hidden"}`}>
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
