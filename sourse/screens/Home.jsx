import React, { useState } from 'react'
import { View,Text, ScrollView, TextInput } from 'react-native'

import Colors from '../constants/Colors';
import { MaterialCommunityIcons } from '@expo/vector-icons';



import { ListMyEvents } from '../components/ListMyEvents';
import { LinearGradient } from 'expo-linear-gradient';


const categories = ['CONFERENCIA','CONCIERTO','TEATRO','SHOW','CINE', 'OTRO'];
//const categories = [{tag:'POP'},{tag:'STAND UP'},{tag:'MUESTRAS'}];
export const Home = (navigation) => {
 //   const [categories, setCategories] = useState( [{tag:'POP'},{tag:'STAND UP'},{tag:'MUESTRAS'}])


  return (
    <View style={{paddingTop:'20%', backgroundColor: Colors.BLACK, height:'100%'}}>
                  <LinearGradient
        colors={[Colors.BLACK, Colors.BACKGROUND_TICKETS]} 
        style={{position:'absolute',bottom:0,height : '30%', width : '100%'}}/>
        <View style={{marginHorizontal: 18, marginBottom:'10%'}}>
           
        <View style={{marginTop:'5%',flexDirection:'row', alignContent:'center', alignItems:'center'}} >
            <>
              <MaterialCommunityIcons name="ticket-confirmation-outline" color={Colors.WHITE} size={36} />
              <Text style={{color:Colors.WHITE, fontSize:36, margin:10}}>Mis Tickets</Text>
            </>
        </View>


                <ListMyEvents ></ListMyEvents>
            
        </View>
                    
        
    </View>
  )
}
