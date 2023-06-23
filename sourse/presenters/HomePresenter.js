
import AppConstants from "../constants/AppConstants";
import { getFirebaseImage } from '../utils/FirebaseHandler';
import { LoginContext } from '../context/LoginContext';

import axios from "axios";
import { useContext } from "react";


export async function getEvents(token, setEvents ){

    const jsonResponse = await axios.get(
        `${AppConstants.API_URL}/organizers/events`,
        {
          headers: {'Authorization':`Bearer ${token}`
                  
            }
        },
    );
    const Events = [];
    if (jsonResponse.status === 200){
        if(!jsonResponse.status_code){

            for(let i=0; i<jsonResponse.data.message.length; i++){
                let imageURI;
                    try{
                        imageURI = await getFirebaseImage("files/"+jsonResponse.data.message[i].photos[0]);
                    }catch(exception){
                        //Image not available
                        imageURI = "https://www.salonlfc.com/wp-content/uploads/2018/01/image-not-found-1-scaled.png";
                    }
                let tags = [];

                let name = jsonResponse.data.message[i].name
                if (name.length > 20){
                    name = name.slice(0,17)+'...';
                }
                let date = jsonResponse.data.message[i].dateEvent.split('-');
                let day = parseInt(date[2]) ;
                let month = parseInt(date[1]);
                Events.push({
                    eventId: jsonResponse.data.message[i]._id.$oid,
                    eventName: name,
                    eventFullName: jsonResponse.data.message[i].name,
                    status:  jsonResponse.data.message[i].status,
                    dateEvent: jsonResponse.data.message[i].dateEvent,
                    attendance:jsonResponse.data.message[i].attendance ,
                    tags: jsonResponse.data.message[i].tags,
                    image: imageURI,
                    eventType: jsonResponse.data.message[i].eventType,
                    day: day,
                    month: month
                });
            }
        }
    } 
    setEvents(Events)  
}


export async function getFireBaseImageWithSetImage(image_path, setImage){
    let imageURI;
    try{
        imageURI = await getFireBaseImage(image_path);
    }catch(exception){
        //Image not available
        imageURI = "https://www.salonlfc.com/wp-content/uploads/2018/01/image-not-found-1-scaled.png";
    }
    setImage(imageURI)
}