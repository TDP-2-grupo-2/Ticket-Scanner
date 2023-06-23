import React from 'react'
import { Text, View } from 'react-native'
import Colors from '../constants/Colors'
import { VerticalBar } from './VerticalBar'

export const BarChart = ({register, total, title}) => {
    const width = 100/register.length; 
  return (
    <View>
        <Text style={{color:Colors.WHITE, textAlign:'center',fontSize:15, marginBottom:'3%'}}>{title}</Text>
        <View style={{height:200, backgroundColor:Colors.TABBAR , flexDirection:'row', justifyContent:'flex-end', padding:'5%', borderRadius:5 }}>
            {register.map(time => <VerticalBar key={time.entry_timestamp} time={time.entry_timestamp} width={width} amount={time.amount_of_entries} total={total} ></VerticalBar>)}
        </View>
    </View>
    
  )
}
