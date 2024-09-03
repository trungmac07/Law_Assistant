import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { marked } from 'marked';
import { home_controller } from '../controllers/home_controller';
import { styles } from '../styles/home_styles';
import ReactMarkdown from 'react-markdown'
import { FaPlusCircle } from "react-icons/fa";

const HomeView = () => {
  const [conversations, setConversations] = useState([]);
  const [input, setInput] = useState('');
  const [selectedConversation, setSelectedConversation] = useState([]);
  const [isNewChat, setIsNewChat] = useState(true);
  const [currentChatID, setCurrentChatID] = useState('');
  const chatContainerRef = useRef(null);
  
  // useEffect(() => {
  //   const fetchConversation = async () => {
  //     if(!isNewChat)
  //     {
  //       try {
  //         const response = await home_controller("HISTORY");
  //         setSelectedConversation(response.data);
  //       } catch (error) {
  //         console.error('Failed to fetch conversation', error);
  //       }
  //     }
  //   };

  //   fetchConversation();
  // }, [currentChatID]);
                                                        
  useEffect(() => {
    const fetchChatHistory = async () => {
      try {
        const response = await home_controller("HISTORY");
        setConversations(response.data);
        
      } catch (error) {
        console.error('Failed to fetch chat history', error);
      }
    };

    fetchChatHistory();

  }, [isNewChat]);

  // Handle sending messages
  const handleSend = async () => {
    if (input.trim()) {
      const text = input.trim();
      setInput('');

      const oldMessages = [...selectedConversation]
      let newMessages = [{ sender: 'user', text: text }, { sender: 'bot', text: "..." }];
      let tmp = [...oldMessages, ...newMessages]
      setSelectedConversation(tmp);
   

      try 
      {
        
        const data = {"user_id" : sessionStorage.getItem("user_id"), 
                      "sender" : "user", 
                      "text" : text, 
                      "conversation_id" : isNewChat ? "new_conversation" : currentChatID}
        if(isNewChat)
            data["conversation_name"] = text;
        
        
        const response = await home_controller("SEND_MESSAGE", data)
        

        if(isNewChat)
        {
            const c_id = response.headers.conversation_id;
            setIsNewChat(false);
            setCurrentChatID(c_id)
            
        }

        newMessages = [{ sender: 'user', text: text }, { sender: 'bot', text: response.data }];

        setSelectedConversation([...oldMessages, ...newMessages]);


      } catch (error) {
        console.error('Failed to send message', error);
        const errorMessage = [{ sender: 'user', text: text },  {sender: 'bot', text: 'Sorry, there was an error sending your message.' }];
        const updatedWithError = [...oldMessages, errorMessage];
   
        setSelectedConversation(updatedWithError);
        //console.log(selectedConversation)
      }

      
    }

    
  };

  const retrieve_conversation = async (c_id) => {
      const conv = await home_controller("RETRIEVE_CONVERSATION", {"conversation_id": c_id})
      setSelectedConversation(conv.data);
      setCurrentChatID(c_id);
      setIsNewChat(false);
  }

  // Handle pressing Enter to send the message
  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      handleSend();
    }
  };

  // Scroll to the bottom of the chat container when new messages are added
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [selectedConversation]);

  // Render message text with Markdown formatting
  const renderMessage = (text) => {
    return {__html: marked(text)};
  };
  
  return (
    <div style={styles.container}>
      <div style={styles.sidebar}>
        <div style={styles.sidebarTitle}>
          <h2 style={{margin : 20}}>Conversations</h2>
          <button style = {{color: '#004d40', background:"transparent", border:"transparent", cursor: 'pointer',}}
                  onClick={() => {setIsNewChat(true); setSelectedConversation([])}}>
            <FaPlusCircle style={{fontSize:30, margin : 10}}/>
          </button>
        </div>
        
        <div style={styles.historyList}>
          {conversations.map((conversation, index) => (
            <div
              key={index}
              style={styles.historyItem}
              onClick={() => retrieve_conversation(conversation["id"])}
            >
              {conversation["conversation_name"]}
            </div>
          ))}
        </div>
      </div>
      <div style={styles.chatArea}>
        <div style={styles.chatFrame}>
          <div style={styles.chatContainer} ref={chatContainerRef}>
            {selectedConversation.map((msg, index) => (
              <div
                key={index}
                style={{
                  ...styles.message,
                  alignSelf: msg.sender === 'user' ? 'flex-end' : 'flex-start',
                  backgroundColor: msg.sender === 'user' ? '#b2ebf2' : '#80deea',
                }}
                dangerouslySetInnerHTML={renderMessage(msg.text)}
              />
                
           
            ))}
          </div>
          <div style={styles.inputContainer}>
            <textarea
              style={styles.textarea}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyPress}
              placeholder="Type a message..."
            />
            <button style={styles.sendButton} onClick={handleSend}>
              Send
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeView;
