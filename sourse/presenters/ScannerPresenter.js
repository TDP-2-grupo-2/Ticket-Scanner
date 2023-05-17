
import AppConstants from "../constants/AppConstants";
import { getFirebaseImage } from '../utils/FirebaseHandler';
import { LoginContext } from '../context/LoginContext';

import axios from "axios";
import { useContext } from "react";


export async function validateTicket(token, event_id, ticket_id, setSuccces, setError, setErrorMessage ){
        
    
    console.log(event_id);
    console.log(ticket_id);
    console.log(token)
    // const paramsLogin = {
    //     method: "PATCH",
    //     headers: {
    //         'Authorization': `Bearer ${token}`,
    //     },

    // };
    // const url = `${AppConstants.API_URL}/organizers/events/${event_id}/ticket_validation/${ticket_id}`
    // const response = await fetch(
    //     url,
    //     paramsLogin
    // );
    // const jsonResponse = await response.json();
    // if (response.status === 200){
    //     setSuccces(true)
    // }
    // else{
    //     setError(true);
    //      console.log(response)
    // }

    
    const jsonResponse = await axios.patch(
        
        `${AppConstants.API_URL}/organizers/events/${event_id}/ticket_validation/${ticket_id}`,
        {},
        {
            headers: {'Authorization': `Bearer ${token}`}
        },
    )  .then(function (response) {
        // handle success
        setSuccces(true)
      })
      .catch(function (error) {
        setError(true);
        console.log(error.response.data)
        setErrorMessage(error.response.data.detail);
      })


}

export function isValidMongoId(id) {
    const regex = /^[0-9a-fA-F]{24}$/;
    return regex.test(id);
  };

