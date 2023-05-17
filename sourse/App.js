import React, { useEffect, useContext, useState } from 'react'

import { NavigationContainer } from '@react-navigation/native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Colors from './constants/Colors';
import { StatusBar } from 'expo-status-bar';
import { Home } from './screens/Home';

import { isLoggedIn, LoginContext } from './context/LoginContext';
import { LogginScreen } from './screens/LogginScreen';
import { LeerQR } from './screens/LeerQR';
import { Text, View } from 'react-native';
// import { LogginScreen } from './screens/LogginScreen';



function EventsStack() {
  const EventsStack = createNativeStackNavigator();
  
  return(
    <EventsStack.Navigator initialRouteName="Events" screenOptions={{ headerShown: false }} >
      <EventsStack.Screen name="Home" component={Home} headerShown={false} />
      {/* <EventsStack.Screen name="ShowPeople" component={ShowPeople} options={{ headerShown: false}}/>
      <EventsStack.Screen name="PeopleInEvent" component={FriendsAssistanceToEvent} options={{ headerShown: false}}/> */}
    </EventsStack.Navigator>
  )
}

function Test(){
  return(
    <Text>asd</Text>
  )
}

function AuthenticatedBottomTab() {
  const AuthTab = createBottomTabNavigator();
  return (
    <AuthTab.Navigator
      screenOptions={{
        tabBarShowLabel: false,
        tabBarActiveTintColor: Colors.TABBAR_ACTIVE,
        tabBarInactiveTintColor: Colors.TABBAR_INACTTIVE,
        tabBarStyle: {
          elevation: 30,
          backgroundColor: Colors.TABBAR,
          borderTopWidth: 0,
          opacity:50
        }
      }}
    >

      <AuthTab.Screen
        name="EventsStack"
        component={EventsStack}
        options={{
					tabBarIcon: ({ focused, color, size }) => <Ionicons name='home-outline' color={color} size={size} />,
          headerShown: false
				}}
      />

    </AuthTab.Navigator>
  )
}

 const MainStack = createNativeStackNavigator();

const notAuthenticatedNavigator = createNativeStackNavigator();

export default function App() {
  const islogged = useContext(LoginContext);
  const [authenticated, setAuthenticated] = useState(null);
  useEffect(() => {
    // Session.getInstance().load()
    // .then(session => {
    //   setAppAuthContext({
    //     userSession: session,
    //     favorites: []
    //   })
    // })
  }, []);

  return (
    
    <LoginContext.Provider value={{ authenticated, setAuthenticated }}>
          
          <NavigationContainer >
          
          {/* <MainStack.Navigator >
                         <MainStack.Screen 
                           name="AuthStack" component={AuthenticatedBottomTab} options={{ headerShown: false }}
                           />
                     </MainStack.Navigator> */}
             {authenticated ? 
                         <MainStack.Navigator >
                         <MainStack.Screen 
                           name="AuthStack" component={AuthenticatedBottomTab} options={{ headerShown: false }}
                        />
                        <MainStack.Screen name="LeerQR" component={LeerQR} options={{ headerShown: false}}/>
                     </MainStack.Navigator>
             :
               <notAuthenticatedNavigator.Navigator screenOptions={{ headerShown: false }}>
                 <notAuthenticatedNavigator.Screen name="Loggin" component={LogginScreen}  options={{ }}/>
                              
              </notAuthenticatedNavigator.Navigator>
              
              
              
             }
            <StatusBar style="light" />
          </NavigationContainer>

      
    </LoginContext.Provider>
        
  );
}