import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';

export const send_message = async (url, data) => {
    const token = sessionStorage.getItem('access_token')
    try {
        
        let response = await axios.post(url, data, {headers : {"Authorization" : `Bearer ${token}`}});

        return response;

    } catch (error) {
        console.error('Error getting response:', error);
        return error;
    }

};
