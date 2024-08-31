import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { marked } from 'marked';
import { home_controller } from '../controllers/home_controller';
import { styles } from '../styles/home_styles';

const HomeView = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [selectedConversation, setSelectedConversation] = useState([]);
  const chatContainerRef = useRef(null);
  
  // Fetch chat history on component mount
  useEffect(() => {
    const fetchChatHistory = async () => {
      try {
        const response = await axios.get('/api/chat-history');
        setMessages(response.data);
        if (response.data.length > 0) {
          setSelectedConversation(response.data[0]); // Set the first conversation as selected
        }
      } catch (error) {
        console.error('Failed to fetch chat history', error);
      }
    };

    fetchChatHistory();
  }, []);

  // Handle sending messages
  const handleSend = async () => {
    if (input.trim()) {

      const newMessage = { sender: 'user', text: input };
      setInput('');
      const updatedMessages = [...selectedConversation, newMessage];
      setMessages(prevMessages => prevMessages.map(conv => 
        conv === selectedConversation ? updatedMessages : conv
      ));
      setSelectedConversation(updatedMessages);

      try 
      {
        //console.log(selectedConversation);
        setSelectedConversation([...updatedMessages, { sender: 'bot', text: "..." }]);
        const response = await home_controller("SEND_MESSAGE", {"text" : input})
        
        // let replyMessage = { sender: 'bot', text: "" };
        // for await (const chunk of response.data)
        // {
        //   replyMessage.text += chunk.toString();
        //   console.log(selectedConversation)
        //   setSelectedConversation(prevMessages => [...prevMessages, replyMessage]);
        // }

        const replyMessage = { sender: 'bot', text: response.data };
        setMessages(prevMessages => prevMessages.map(conv => 
          conv === selectedConversation ? [...updatedMessages, replyMessage] : conv
        ));
        setSelectedConversation([...updatedMessages, replyMessage]);
        

      } catch (error) {
        console.error('Failed to send message', error);
        const errorMessage = { sender: 'bot', text: 'Sorry, there was an error sending your message.' };
        const updatedWithError = [...updatedMessages, errorMessage];
        setMessages(prevMessages => prevMessages.map(conv => 
          conv === selectedConversation ? updatedWithError : conv
        ));
        setSelectedConversation(updatedWithError);
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
    return { __html: marked(text) };
  };
  
  return (
    <div style={styles.container}>
      <div style={styles.sidebar}>
        <h2 style={styles.sidebarTitle}>Conversations</h2>
        <div style={styles.historyList}>
          {messages.map((conversation, index) => (
            <div
              key={index}
              style={styles.historyItem}
              onClick={() => setSelectedConversation(conversation)}
            >
              Conversation {index + 1}
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
