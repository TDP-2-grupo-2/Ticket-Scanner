
import AppConstants from "../constants/AppConstants";
import { getFirebaseImage } from '../utils/FirebaseHandler';
import { LoginContext } from '../context/LoginContext';

import axios from "axios";
import { useContext } from "react";


export async function validateTicket(token, event_id, ticket_id, setSuccces, setError, setErrorMessage ){
        
    
    
    // console.log(ticket_id);
    // console.log(token)

    
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
        setErrorMessage(error.response.data.detail);
      })


}


export async function getEventMetrics(token, event_id, setSuccces ){
    
  console.log(event_id);
  console.log(token)
  
  const jsonResponse = await axios.get(
    
      `${AppConstants.API_URL}/organizers/events/${event_id}/statistics`,
      
        {
          headers: {'Authorization':`Bearer ${token}`
                  
            }
        },
  )  .then(function (response) {
      console.log(response.data.message)
      setSuccces(response.data.message)
    })
    .catch(function (error) {
      
      console.log(error.response)
      
    })
}


export function isValidMongoId(id) {
    const regex = /^[0-9a-fA-F]{24}$/;
    return regex.test(id);
  };

