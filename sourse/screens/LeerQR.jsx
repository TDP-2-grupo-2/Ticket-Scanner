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
import { LectorQR } from '../components/LectorQR';
import { EventMetrics } from '../components/EventMetrics';
import { EventDeatailSelector } from '../components/EventDeatailSelector';

export const LeerQR = ({route}) => {
    const navigator = useNavigation();
    const [params, setParams] = useState(route.params)

    const [scannerView, setScannerView] = useState(true)
  useEffect(() => {
    //console.log(params.eventId)
  

  }, [])
  
   
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


        <View style={{marginHorizontal: 18, marginBottom:'10%'}}>
    
          <View style={{marginTop:'5%',flexDirection:'row', alignContent:'center', alignItems:'center', marginBottom:'10%'}} >
              <>
                <MaterialCommunityIcons name="ticket-confirmation-outline" color={Colors.WHITE} size={36} />
                <Text style={{color:Colors.WHITE, fontSize:30, marginLeft:10}}>{params?.eventFullName}</Text>
              </>
          </View>
          <EventDeatailSelector setScannerView={setScannerView} scannerView={scannerView} ></EventDeatailSelector>
          {
            scannerView?
            <LectorQR eventId = {params.eventId}></LectorQR>  
            :
            <EventMetrics eventId = {params.eventId} ></EventMetrics>
          }
          
          
        </View>
    </View>
  )
}


