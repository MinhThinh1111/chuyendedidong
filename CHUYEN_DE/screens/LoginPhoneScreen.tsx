
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { TouchableOpacity } from "react-native";
import { StatusBar, StyleSheet, Text, View, TextInput } from "react-native";
import { useNotes } from "../ConText/MyNote";
import AsyncStorage from "@react-native-async-storage/async-storage";
const LoginPhoneScreen = () => {
    const navigation = useNavigation()
    const [isPhone, setPhone] = useState('')
    const [ischeckPhone, setcheckPhone] = useState(false)
    const { IsNote, SetNote, getNote }: any = useNotes()

    const login = async () => {
        let regexPhone = new RegExp('(0[3|5|7|8|9])+([0-9]{8})')
        if (regexPhone.test(isPhone)) {
       
            
            const res = await fetch('http://192.168.1.2:3000/hanhkhach/searchSDT/' + isPhone);
            const data = await res.json();

            if (data.length > 0) {
                let Data = {
                    id: data[0].Id,
                    TenHanhKhach: data[0].Ten,
                    SDT: data[0].Sdt,
                }
                SetNote(Data)
                AsyncStorage.setItem('Account', JSON.stringify(Data));
                navigation.navigate("App")
            } else {
                navigation.navigate("LoginName", { phone: isPhone })
            }
        } else {
            setcheckPhone(true)
        }

    }
    useEffect(() => {
      
        if(IsNote.SDT != undefined){
            navigation.navigate("App")
        }   
    })
    return (
        <>
            <StatusBar translucent={true} backgroundColor={'transparent'} barStyle="dark-content"></StatusBar>
            <View style={styles.header}>
            </View>
            <View style={styles.phone}>
                <View style={{ padding: 30 }}>
                    <Text style={{ color: 'black', fontSize: 23, fontWeight: 'bold', marginTop: 30 }}>Nhập số điện thoại cửa bạn!</Text>
                    <Text style={{ paddingRight: 12, fontSize: 15, paddingTop: 8 }}>Mã bảo mật gồm 6 chứ số sẽ được gửi qua SMS để xác thực số điện thoại di động của bạn.</Text>
                    <TextInput keyboardType="numeric" onChangeText={(value) => setPhone(value)} style={[styles.btnPhone,]} placeholder="Nhập số điện thoại " />
                    {
                        ischeckPhone ? (
                            <Text style={{ color: 'red', marginTop: 2 }}>Nhập đúng định dạng và không được để rỗng</Text>
                        ) : (
                            ''
                        )
                    }
                    <TouchableOpacity onPress={() => login()} style={{ width: '100%', backgroundColor: '#FF6600', borderRadius: 15, marginTop: 35 }}><Text style={{ alignSelf: 'center', padding: 15, fontSize: 16, color: 'white' }}>Tiếp tục</Text></TouchableOpacity>
                </View>
            </View>
        </>
    )
}
const styles = StyleSheet.create({
    header: {
        backgroundColor: '#FF6600',
        height: 80
    },
    phone: {
        top: -30,
        flex: 1,
        backgroundColor: '#FFFFFF',
        borderRadius: 20
    },
    btnPhone: {
        padding: 10,
        borderWidth: 1,
        borderColor: '#d9dedb',
        borderRadius: 15,
        // marginVertical: 35, 
        marginTop: 35,
        fontSize: 16
    }

})
export default LoginPhoneScreen; 