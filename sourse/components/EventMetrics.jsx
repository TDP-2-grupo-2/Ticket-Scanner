import { async } from '@firebase/util'
import React, { useEffect ,useContext,useState} from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import Colors from '../constants/Colors'
import { LoginContext } from '../context/LoginContext'
import { getEventMetrics } from '../presenters/ScannerPresenter'


import Svg, { Circle, Rect } from 'react-native-svg';
import SvgComponent from './SvgComponent'
import { BarChart } from './BarChart'
import { LoadingBar } from './LoadingBar'



export const EventMetrics = ({eventId}) => {
    const { authenticated } = useContext(LoginContext);
    const [metrics, setMetrics] = useState(null);
    const data = [
        {quarter: 1, earnings: 13000},
        {quarter: 2, earnings: 16500},
        {quarter: 3, earnings: 14250},
        {quarter: 4, earnings: 19000}
      ];
    
    const getMetrics = async (event) =>{
        await getEventMetrics(authenticated.token, event, setMetrics)
    }
    useEffect(() => {
        
        if(eventId){
            
            getMetrics(eventId)
        }
        
    
    }, [])
    
  return (
    <View style={{height:'100%'}}>
      {
        metrics? <>
        <BarChart register = {metrics.entries}  total ={metrics.attendance} title={"Cantidad de entradas registradas por hora"}></BarChart>
        <LoadingBar title={'Asistencia'} amount={metrics.current_registered_attendance} total={metrics.attendance}></LoadingBar>
        <LoadingBar title={'Entradas adquiridas'} amount={metrics.attendance} total={metrics.capacity}></LoadingBar></>:
        <Text style={{color:Colors.WHITE, textAlign:'center',fontSize:20}}>Cargando estadisticas..</Text>
      
      }
      
      

                


    </View>
  )
}
