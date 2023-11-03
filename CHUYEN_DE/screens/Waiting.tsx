import React from 'react';
import { ScrollView, Text, TouchableOpacity, View, TextInput, StyleSheet, Alert, FlatList } from "react-native";
const Waiting = () =>{
    return (
        <>
           <View style={{padding:20}}>
            <View style={{width:"100%",height:150,backgroundColor:'#d4d4d4'}}></View>
            <View style={{marginTop:15}}>
                <View style={{width:"80%",height:10,backgroundColor:'#d4d4d4'}}></View>
                <View style={{width:"60%",height:10,backgroundColor:'#d4d4d4',marginTop:8}}></View>
            </View>
           </View>
           <View style={{padding:20}}>
            <View style={{width:"100%",height:150,backgroundColor:'#d4d4d4'}}></View>
            <View style={{marginTop:15}}>
                <View style={{width:"80%",height:10,backgroundColor:'#d4d4d4'}}></View>
                <View style={{width:"60%",height:10,backgroundColor:'#d4d4d4',marginTop:8}}></View>

            </View>
           </View>
        </>
    )
}

export default Waiting;