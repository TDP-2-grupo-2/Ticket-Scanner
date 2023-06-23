
import { LinearGradient } from 'expo-linear-gradient'
import React, {useContext, useEffect,useState} from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import Colors from '../constants/Colors'
import { MaterialCommunityIcons } from '@expo/vector-icons';

import Ionicons from '@expo/vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';

import { BarCodeScanner } from 'expo-barcode-scanner';
import { ModalAccept } from '../components/ModalAccept';
import { isValidMongoId, validateTicket } from '../presenters/ScannerPresenter';
import { LoginContext } from '../context/LoginContext';

export const LectorQR = ({eventId}) => {
    const navigator = useNavigation();
    const [event, setEvent] = useState(eventId)
    const [hasPermission, setHasPermission] = useState(null);
    const [scanned, setScanned] = useState(false);
    const [toggleSuccess, setToggleSuccess] = useState(false);
    const [toggleError, setToggleError] = useState(false);
    const [errorMessage, seterrorMessage] = useState("Ocurrio un error")
    const { authenticated } = useContext(LoginContext);
    const getBarCodeScannerPermissions = async () => {
        const { status } = await BarCodeScanner.requestPermissionsAsync();
        setHasPermission(status === 'granted');
      };
  
      useEffect(() => {
       getBarCodeScannerPermissions();
  
      }, []);
      const handleBarCodeScanned = ({ type, data }) => {
        setScanned(true);
        if(isValidMongoId(data)){
          validateTicket(authenticated.token,event,data,setToggleSuccess, setToggleError, seterrorMessage);
        }else{
          setToggleError(true);
           seterrorMessage('El codigo no pertenece a la TicketApp')
        }
      };
  return (
    <View>
        <ModalAccept toggle={toggleSuccess} header='Exito' bodyText='Se registro la entrada' setToggle = {setToggleSuccess} type="success"></ModalAccept>
        <ModalAccept toggle={toggleError} header='Error' bodyText={errorMessage} setToggle = {setToggleError} type="error"></ModalAccept>
        {hasPermission === true? 
            <View style={{height:'80%', alignContent:'center',justifyContent:'center' }}>  
              {scanned? 
              <TouchableOpacity style={{  
                backgroundColor:Colors.PURPLE_BUTTOM,  
                borderRadius:10,
                paddingVertical:30,
                
                margin:5,}} onPress={() => setScanned(false)}> 
              <Text style={{color:Colors.WHITE, textAlign:'center',fontSize:20}}>Volver a escanear</Text>
              </TouchableOpacity> 
              :
              <BarCodeScanner
                onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
                style={StyleSheet.absoluteFillObject}
              />
              }  
            </View>
            :
            <Text style={{color:Colors.WHITE, textAlign:'center',fontSize:20}}>Debes autorizar el uso de la camara para poder escanear</Text>
          }
    </View>
  )
}
const styles = StyleSheet.create({
    container: {
      flex: 1,
      flexDirection: 'column',
      justifyContent: 'center',
      borderRadius:10
    },
  });