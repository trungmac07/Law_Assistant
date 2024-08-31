import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';

export const get = async (url) => {
    const token = sessionStorage.getItem('access_token')
    try {
        let response = await axios.get(
                url, 
                {
                    headers : {"Authorization" : `Bearer ${token}`},
                    params: {"user_id": sessionStorage.getItem('user_id')},
                },
        );

        return response;

    } catch (error) {
        console.error('Error getting response:', error);
        return error;

    }

};
