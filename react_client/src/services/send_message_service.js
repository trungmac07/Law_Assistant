import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';

export const send_message = async (url, data, kwargs) => {

    const token = sessionStorage.getItem('access_token');

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const headers = {};
        
        for(let entry of response.headers.entries()) {
            headers[entry[0]] = entry[1];
        }

        const reader = response.body.getReader();
        const decoder = new TextDecoder();
        let chunk = '';
        let full_response = ''
        

        while (true) {
            const { done, value } = await reader.read();
            if (done) 
            {
                const oldMessages = kwargs["selectedConversation"]
                let newMessages = { sender: 'bot', text: full_response.substring(0, full_response.length - 4) };
                kwargs["setSelectedConversation"]([...oldMessages, newMessages]);
                kwargs["setCurrentMessage"]('');
                break;
            }
            chunk = decoder.decode(value, { stream: true });
            
            //console.log(chunk);
            full_response += chunk;
            // Call the callback function with the new chunk
            kwargs["updateStream"](chunk);
            
        }

        return {"headers":headers}
        

    } catch (error) {
        console.error('Error getting response:', error);
        throw error;
    }

    // const token = sessionStorage.getItem('access_token')
    // try {
        
    //     let response = await axios.post(url, data, {headers : {"Authorization" : `Bearer ${token}`}, responseType: 'stream'});
        
    //     return response;

    // } catch (error) {
    //     console.error('Error getting response:', error);
    //     return error;
    // }
    //////////////////////////////////////////////////////////////////////////////////////
    //const token = sessionStorage.getItem('access_token')
    // console.log("http://localhost:8000/" + url)

    // try {
    //     const response = await fetch("http://localhost:8000/" + url, {
    //         method: 'POST',
    //         headers: {
    //             'Authorization': `Bearer ${token}`,
    //             'Content-Type': 'application/json'
    //         },
    //         body: JSON.stringify(data),
    //     });
    //     console.log(response) 
    //     if (response.status !== 200) throw new Error(response.status.toString())
    //     if (!response.body) throw new Error('Response body does not exist')
    //     return response.json()    
    //     const reader = response.body.getReader();
    //     const decoder = new TextDecoder('utf-8');
    //     let chunkValue = '';
    
    //     while (true) {
    //         const { done, value } = await reader.read();
    
    //         if (done) {
    //             console.log('Stream complete');
    //             break;
    //         }
    
    //         // Decode the chunk value and append it
    //         const chunk = decoder.decode(value, { stream: true })
    //         chunkValue += chunk;
            
    
    //         // You can update the state or handle the data chunk here
    //     }
    
        

    // } catch (error) {
    //     console.error('Error getting response:', error);
    //     return error;
    // }
};
