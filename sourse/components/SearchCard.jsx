
import React, { useState } from 'react'
import { Image, StyleSheet, Text,TouchableOpacity,View } from 'react-native'
import Colors from '../constants/Colors'
import { useNavigation } from '@react-navigation/native';
import { ModalAccept } from './ModalAccept';
const TextStyle = {
  marginVertical:3
}
export const SearchCard = ({event}) => {
  const navigation = useNavigation();
  const [toggle, setToggle] = useState(false);
  const [message, setMessage] = useState({header:'Error', body:'No puedes escanear un evento finalizado'});
  const onCardPress = () => {
    if(event.status == 'active'){
      navigation.navigate('LeerQR', event);  
    }else{
      if(event.status == 'canceled'){
        setMessage({header:'Error', body:'No puedes escanear un evento cancelado'})
      }else{
        setMessage({header:'Error', body:'No puedes escanear un evento finalizado'})
      }
      setToggle(true);
    }
}
  return (
    <>
    <ModalAccept toggle={toggle} header={message?.header} bodyText={message?.body} setToggle = {setToggle}></ModalAccept>
    <TouchableOpacity onPress={onCardPress} style={ [styles.card,event.status == 'active' ? styles.active: (styles.card,event.status == 'canceled'?styles.canceled: styles.inactive)]}>
        <Image style={{ height: 90, width:90, borderRadius:10, margin:10}} source={{ uri: event.image }}> 
    </Image>
        <View style={{margin:10, justifyContent:'center'}}>
        <Text style={[TextStyle,{color:Colors.WHITE, fontSize:18, fontWeight:'bold'}]} >{event.eventName}</Text>
        <Text style={[TextStyle,{color:Colors.TEXT_SEC, fontSize:15, fontWeight:'bold'}]} >{event.eventType}</Text>
        <Text style={[TextStyle,{color:Colors.TEXT_SEC, fontSize:15, fontWeight:'bold'}]} >{event.dateEvent}</Text>
        
        </View>

    </TouchableOpacity>
    </>

  )
}
const styles = StyleSheet.create({
  card: {
    
    borderBottomWidth:2,
    borderColor:'#1D1D1D' ,
    borderRadius:10 , 
    margin:10, 
    justifyContent:'flex-start', 
    flexDirection:'row'
    
  },
  active: {
    backgroundColor:Colors.PURPLE,
  },
  canceled: {
    backgroundColor:Colors.RED,
  },
  inactive: {
    backgroundColor:Colors.CARDGRAY,
  }
});