import React from 'react'
import { Text, View } from 'react-native'
import Colors from '../constants/Colors'

export const LoadingBar = ({amount, total,title}) => {
  return (
    <View style={{justifyContent:'space-between', alignItems:'center',flexDirection:'row', height:'7%', marginVertical:'4%'}}>
        <Text style={{color:Colors.WHITE,fontSize:15,width:'30%'}}>{title}</Text>
        <View style={{backgroundColor:Colors.PURPLE ,height:'80%',width:'70%' }}>
            <View style={{backgroundColor:Colors.PURPLE_BUTTOM ,height:'100%',width:`${total?(amount/total * 100):100 }%` }}>
                
            </View>
            <Text style={{color:Colors.WHITE, textAlign:'center',fontSize:15}}>{`${total?Math.round(amount/total * 100):100 }%`}</Text>
        </View>
    </View>
  )
}
