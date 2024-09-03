import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';

export const get_conversation = async (url, data) => {
    const token = sessionStorage.getItem('access_token')
    try {
        const c_id = data["conversation_id"]
        let response = await axios.get(
                url, 
                {
                    headers : {"Authorization" : `Bearer ${token}`},
                    params : data
                },
        );

        return response;

    } catch (error) {
        console.error('Error:', error);
        return error;

    }

};
