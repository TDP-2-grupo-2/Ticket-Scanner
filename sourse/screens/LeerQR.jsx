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

export const LeerQR = ({route}) => {
    const navigator = useNavigation();
    const [params, setParams] = useState(route.params)
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
        validateTicket(authenticated.token,params.eventId,data,setToggleSuccess, setToggleError, seterrorMessage);
      }else{
        setToggleError(true);
         seterrorMessage('El codigo no pertenece a la TicketApp')
      }
    };

   
  return (
    <View style={{paddingTop:'20%', backgroundColor: Colors.BLACK, height:'100%'}}>
        <LinearGradient 
        colors={[Colors.BLACK, Colors.BACKGROUND_TICKETS]} 
        style={{position:'absolute',bottom:0,height : '30%', width : '100%'}}/>
        <TouchableOpacity  onPress={() => {navigator.goBack()}} style={{ marginLeft:20,paddingHorizontal:10,
                   paddingVertical:5, backgroundColor:Colors.SOMBREADO,width:"15%",
                    borderRadius:15,}}>
          <Ionicons  name="arrow-back-sharp" color={Colors.WHITE} size={30}></Ionicons>
        </TouchableOpacity>
        <ModalAccept toggle={toggleSuccess} header='Exito' bodyText='Se registro la entrada' setToggle = {setToggleSuccess} type="success"></ModalAccept>
        <ModalAccept toggle={toggleError} header='Error' bodyText={errorMessage} setToggle = {setToggleError} type="error"></ModalAccept>

        <View style={{marginHorizontal: 18, marginBottom:'10%'}}>
    
          <View style={{marginTop:'5%',flexDirection:'row', alignContent:'center', alignItems:'center', marginBottom:'10%'}} >
              <>
                <MaterialCommunityIcons name="ticket-confirmation-outline" color={Colors.WHITE} size={36} />
                <Text style={{color:Colors.WHITE, fontSize:30, marginLeft:10}}>{params?.eventName}</Text>
              </>
          </View>
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