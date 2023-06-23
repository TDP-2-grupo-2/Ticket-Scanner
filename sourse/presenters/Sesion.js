
import axios from "axios";

import {
    GoogleSignin,
    GoogleSigninButton,
    statusCodes,
  } from '@react-native-google-signin/google-signin';
import AppConstants from "../constants/AppConstants";
import ApiKeys from "../constants/ApiKeys";

  
  
  
  
  GoogleSignin.configure({
    clientId:ApiKeys.CLIENT_ID,
    androidClientId: ApiKeys.ANDROID_CLIENT_ID,
  });

async function envioCredenciales(email, nombre){

    const jsonResponse = await axios.post(
        `${AppConstants.API_URL}/organizers/loginGoogle`,
        {
          email: 'rsanchez@fi.uba.ar',
          name:'Ramiro Sanchez',
        },
    );

    if (jsonResponse.status === 200){
        if(!jsonResponse.status_code){
            return jsonResponse.data;
        }
    } 

}



export async function  signIn(setCredentials) {
  GoogleSignin.configure({
    clientId:ApiKeys.CLIENT_ID,
    androidClientId: ApiKeys.ANDROID_CLIENT_ID,
  });

    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      
        let email = userInfo.user.email;
        let name = userInfo.user.givenName +' '+ userInfo.user.familyName;
        let token = await envioCredenciales(userInfo.user.email, name);
        let credentials = {email:email,// 'asegura@fi.uba.ar',
        name:name,//'Agustina Segura',
        photo:userInfo.user.photo, 
        token:token
        }
        return credentials;
    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        // user cancelled the login flow
      } else if (error.code === statusCodes.IN_PROGRESS) {
        // operation (e.g. sign in) is in progress already
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        // play services not available or outdated
      } else {
        // some other error happened
      }
    }
  };