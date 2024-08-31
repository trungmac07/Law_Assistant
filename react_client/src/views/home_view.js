import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { marked } from 'marked';
import { home_controller } from '../controllers/home_controller';
import { styles } from '../styles/home_styles';
import ReactMarkdown from 'react-markdown'

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
    console.log(sessionStorage.getItem('access_token'));
    const fetchChatHistory = async () => {
      try {
        const response = await home_controller("HISTORY");
        console.log(response.data);
        setConversations(response.data);
      } catch (error) {
        console.error('Failed to fetch chat history', error);
      }
    };

    fetchChatHistory();
  }, []);

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
            data["conversation_name"] = text.trim();
        
        
        const response = await home_controller("SEND_MESSAGE", data)
        

        if(isNewChat)
        {
            setIsNewChat(false)
            setCurrentChatID(response.headers.conversation_id)
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
        <h2 style={styles.sidebarTitle}>Conversations</h2>
        <div style={styles.historyList}>
          {conversations.map((conversation, index) => (
            <div
              key={index}
              style={styles.historyItem}
              onClick={() => setSelectedConversation(conversation)}
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
            <input
              style={styles.input}
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
