import React from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import Colors from '../constants/Colors';

export const EventDeatailSelector = ({setScannerView,scannerView}) => {
  return (
    <View style={{marginVertical:5, justifyContent:'space-around', flexDirection:'row', marginBottom:20}}>
        <TouchableOpacity style={scannerView?styles.selected: styles.notSelected} onPress={()=>{setScannerView(true)}}>
            <Text style={{color:Colors.WHITE}}>Escaner</Text>
        </TouchableOpacity>
        <TouchableOpacity style={!scannerView?styles.selected: styles.notSelected} onPress={()=>{setScannerView(false)}}>
            <Text style={{color:Colors.WHITE}}>Estadisticas</Text>
        </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
    selected: {
      color:Colors.WHITE,
      flexDirection:'row',
       alignContent:'center',
        alignItems:'center',
      backgroundColor:Colors.PURPLE_BUTTOM,
      paddingHorizontal:'10%',
      borderRadius:10,
      paddingVertical:10,
      
    },
    notSelected: {
        backgroundColor:Colors.PURPLE,
        flexDirection:'row',
         alignContent:'center',
          alignItems:'center',
        backgroundColor:Colors.PURPLE,
        paddingHorizontal:'10%',
        borderRadius:10,
        paddingVertical:10,
        
      },
    
  });