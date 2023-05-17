import React, { useContext, useEffect, useState } from 'react'
import { RefreshControl, ScrollView, Text, View } from 'react-native'
import { getEvents } from '../presenters/HomePresenter'
import { SearchCard } from './SearchCard'
import { Fontisto } from '@expo/vector-icons';
import Colors from '../constants/Colors';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { LoginContext } from '../context/LoginContext';

export const ListMyEvents = () => {
  const [eventos, setEventos] = useState([])
  const [refreshing, setRefreshing] = useState(false);
  const { authenticated } = useContext(LoginContext);
  useEffect(() => {
    console.log(authenticated.token)
    getEvents(authenticated.token,setEventos);
    
 }, [])
 const onRefresh = async () => {
  setRefreshing(true);
  await getEvents(authenticated.token,setEventos );
  setRefreshing(false);
} 
  return (
    <ScrollView style={{marginBottom:'10%'}}
    refreshControl={
      <RefreshControl refreshing={refreshing} 
          onRefresh={onRefresh} />
    }
    >
    {eventos.length>=1 ?
    eventos.map(evento => <SearchCard key={evento.eventId} event = {evento}> </SearchCard>)
    :
    <View style={{justifyContent:'center', alignItems:'center', marginTop:'10%'}}>
      <Fontisto name="ticket" size={150} color={Colors.TABBAR_INACTTIVE} />
      <Text style={{color:Colors.WHITE ,  fontSize:20, marginTop:10}}>Todavia no tienes eventos!</Text>
    </View>
    }  
    </ScrollView>
    
  )
}
