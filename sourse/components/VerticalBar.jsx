import React from 'react'
import { Text, View } from 'react-native'
import Colors from '../constants/Colors'

export const VerticalBar = ({time , amount, total, width}) => {
  return (
    <View style={{width: `${width}%`,justifyContent:'flex-end',marginTop:'3%'}}>
        <View style={[{ height:`${amount/total * 100 }%`, marginHorizontal:'5%', borderTopLeftRadius:5, borderTopRightRadius:5}, amount/total >=0.45?{backgroundColor:Colors.PURPLE_BUTTOM}:{backgroundColor:Colors.PURPLE}]}>
            <Text style={{color:Colors.WHITE, textAlign:'center'}}>{amount}</Text>
        </View>
        <Text style={{color:Colors.WHITE,textAlign:'center'}}>{`${time.split(' ')[1]} hs`}</Text>
    </View>
  )
}
