import React, { useEffect } from "react";
import { StyleSheet, View } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import HomeScreen from "./screens/HomeScreens";
import { Text } from "react-native";
import TabNavigator from "./screens/navigation/TabNavigator";
import AddressToScreens from "./screens/AddressToScreens";
import DateScreens from "./screens/DateScreens";
import TripListScreens from "./screens/TripListScreens";
import ChooseSeatScreen from "./screens/ChooseSeatScreen ";
import BookTicket from "./screens/BookTicket";
import MyNote from "./ConText/MyNote";
import LoginPhoneScreen from "./screens/LoginPhoneScreen";
import LoginNameScreen from "./screens/LoginNameScreen";
import Ticketinformation from "./screens/TicketInformation";
const Stack = createNativeStackNavigator();
const App = () => {
  return (
    <>
      <NavigationContainer>
        <MyNote>
          <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="LoginPhone" component={LoginPhoneScreen}></Stack.Screen>
            <Stack.Screen name="LoginName" component={LoginNameScreen}></Stack.Screen>
            <Stack.Screen name="App" component={TabNavigator}></Stack.Screen>
            <Stack.Screen name="AddresTo" component={AddressToScreens}></Stack.Screen>
            <Stack.Screen name="Date" component={DateScreens}></Stack.Screen>
            <Stack.Screen name="TripList" component={TripListScreens}></Stack.Screen>
            <Stack.Screen name="ChooseSeat" component={ChooseSeatScreen}></Stack.Screen>
            <Stack.Screen name="BookTicket" component={BookTicket}></Stack.Screen>
            <Stack.Screen name="TicketInform" component={Ticketinformation}></Stack.Screen>
          </Stack.Navigator>
        </MyNote>
      </NavigationContainer>
    </>
  )
}
const styles = StyleSheet.create({
})

export default App;