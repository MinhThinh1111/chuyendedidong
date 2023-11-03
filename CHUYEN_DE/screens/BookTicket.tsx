import React, { useEffect, useState } from "react";
import { ScrollView, Text, TouchableOpacity, View, TextInput, StyleSheet, Alert, FlatList } from "react-native";
import { StatusBar } from "react-native";
import IconIonicons from "react-native-vector-icons/Ionicons";
import IconEntypo from "react-native-vector-icons/Entypo";
import IconFeather from "react-native-vector-icons/Feather";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNotes } from "../ConText/MyNote";

import axios from "axios";


const BookTicket = ({ route, navigation }: any) => {
    const { IsNote, SetNote, getNote }: any = useNotes()
    const { data, Id_ChuyenDi, TongTien } = route.params;
    const [DiemDi, setDiemDi] = useState('')
    const [DiemTra, setDiemTra] = useState('')
    const [batDau, setBatDau] = useState([])
    const [batCuoi, setBatCuoi] = useState([])
    const [dontra, setDonTra] = useState(1)
    const [checkmodle, setcheckmodle] = useState(1)
    const [input, setInput] = useState('')

    const getBookTicket = async () => {
        const data = await AsyncStorage.getItem('idHuyen');
        let id = data?.split(',');
        try {
            // const res = await fetch('http://192.168.1.2:3000/diemxe/huyen/' + id[0]);
            const res = await fetch('http://192.168.1.2:3000/diemxe/huyen/' + id[0]);
            const data = await res.json();
            setBatDau(data);
        } catch (err) {
            console.log(err);
        }
        try {
            
            // const res = await fetch('http://172.16.0.120:3000/diemxe/huyen/' + id[1]);
            const res = await fetch('http://192.168.1.2:3000/diemxe/huyen/' + id[1]);
            const data = await res.json();
            setBatCuoi(data);
        } catch (err) {
            console.log(err);
        }
    }

    const chonDiemdon = (name: any, trangthai: any) => {
        if (trangthai == 2) {
            setcheckmodle(2)
        } else {
            if (dontra == 1) {
                setDiemDi(name)
                setcheckmodle(1)
            } else {
                setDiemTra(name)
                setcheckmodle(1)
            }
        }
    }

    const datvexe = async () => {
        try {

            for (let index = 0; index < data.length; index++) {
                // axios.get('http://192.168.1.2:3000/chongoi/check/' + Id_ChuyenDi + '/' + data[index].Id).then((response) => {
                axios.get('http://192.168.1.2:3000/chongoi/check/' + Id_ChuyenDi + '/' + data[index].Id).then((response) => {
                    if (response.data.Id != undefined) {
                        Alert.alert('Thông báo', 'Lỗi hệ thống khi đặt vé')
                        navigation.navigate('Home')
                    }
                })  
            }

            axios.get('http://192.168.1.2:3000/chuyendi/' + Id_ChuyenDi).then((response) => {
                // axios.get('http://192.168.1.2:3000/chuyendi/' + Id_ChuyenDi).then((response) => {
                let updatechuyendi = {
                    Id: response.data.Id,
                    SoGheTrong: response.data.SoGheTrong - data.length
                }
                // axios.put('http://192.168.1.2:3000/chuyendi/updateSoGheTrong', updatechuyendi).then((response) => {
                // })
                axios.put('http://192.168.1.2:3000/chuyendi/updateSoGheTrong', updatechuyendi).then((response) => {
                })
            });


            let formVeXe = {
                Id_ChuyenDi: Id_ChuyenDi,
                Id_HanhKhach: IsNote.id,
                DiemDon: DiemDi,
                DiemTra: DiemTra,
                TrangThai: 1,
                TongTien: TongTien,
                thanhtoan: 1

            }
            // axios.post('http://192.168.1.2:3000/vexe/', formVeXe).then((response) => {
            axios.post('http://192.168.1.2:3000/vexe/', formVeXe).then((response) => {
                for (let index = 0; index < data.length; index++) {
                    let formChongoi = {
                        Id_VeXe: response.data.insertId,
                        Id_GheXe: data[index].Id,
                        TrangThai: 1,
                        Id_ChuyenDi: Id_ChuyenDi,

                    }
                    // axios.post('http://192.168.1.2:3000/chongoi/', formChongoi).then((response) => {
                    // });
                    axios.post('http://192.168.1.2:3000/chongoi/', formChongoi).then((response) => {
                    });
                }

                axios.get('http://192.168.1.2:3000/chuyendi/' + Id_ChuyenDi).then((response) => {
                    // axios.get('http://192.168.1.2:3000/chuyendi/' + Id_ChuyenDi).then((response) => {
                    let updatechuyendi = {
                        Id: response.data.Id,
                        SoGheTrong: response.data.SoGheTrong - data.length
                    }
                    axios.put('http://192.168.1.2:3000/chuyendi/updateSoGheTrong', updatechuyendi).then((response) => {    
                        // axios.put('http://192.168.1.2:3000/chuyendi/updateSoGheTrong', updatechuyendi).then((response) => {
                        Alert.alert('Thông báo', 'Đặt Vé Thành Công')
                        navigation.navigate('MyTric')
                    })
                });
            });
           
        } catch (err) {
            console.log(err)
        }
    }

    useEffect(() => {
        getBookTicket()
    }, [])
    return (
        <>
            <StatusBar translucent={true} backgroundColor={'transparent'} barStyle="dark-content"></StatusBar>
            <View style={{ height: 38, backgroundColor: '#FF6600' }}></View>
            <View style={{ justifyContent: "space-between", flexDirection: 'row', padding: 15 }}>
                <TouchableOpacity onPress={() => navigation.goBack()}><IconIonicons name="chevron-back" size={28} color="black" /></TouchableOpacity>
                <Text style={{ color: 'black', fontWeight: 'bold', fontSize: 20 }}>Chọn điểm đón và trả</Text>
                <Text>      </Text>
            </View>
            <View style={{ height: 1, backgroundColor: '#FF6600' }}></View>
            <View style={{ padding: 15 }}>
                <TouchableOpacity onPress={() => setDonTra(1)}>
                    <View style={{ width: '100%', height: 100, borderRadius: 12, borderWidth: 1, borderColor: 'red' }}>
                        <Text style={{ fontSize: 18, fontWeight: 'bold', color: '#FF6600', paddingTop: 15, paddingLeft: 10 }}>Điểm đón</Text>
                        <Text style={{ fontSize: 16, color: 'black', paddingLeft: 10 }}>{DiemDi}</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setDonTra(2)}>
                    <View style={{ width: '100%', height: 100, borderRadius: 12, borderWidth: 1, borderColor: 'red', marginTop: 15 }}>
                        <Text style={{ fontSize: 18, fontWeight: 'bold', color: '#FF6600', paddingTop: 15, paddingLeft: 10 }}>Điểm trả</Text>
                        <Text style={{ fontSize: 16, color: 'black', paddingLeft: 10 }}>{DiemTra}</Text>
                    </View>
                </TouchableOpacity>
            </View>

            <View style={{ padding: 15 }}>
                {dontra == 1 ?
                    <Text style={{ fontSize: 18, color: 'black' }}>Danh sách điểm đón</Text>
                    :
                    <Text style={{ fontSize: 18, color: 'black' }}>Danh sách điểm trả</Text>
                }
                {dontra == 1 &&
                    <FlatList data={batDau}
                        renderItem={({ item }: any) =>
                            <View>
                                <TouchableOpacity onPress={() => chonDiemdon(item.Name, item.TrangThai)} style={{ paddingVertical: 15, flexDirection: 'row' }}>
                                    <IconIonicons name="car" size={28} color="#265ff0" style={{ marginTop: 6 }} />
                                    <View style={{ paddingLeft: 5 }}>
                                        <Text style={{ fontSize: 18, color: 'black', paddingBottom: 5 }}>{item.Name}</Text>
                                        <Text style={{ fontSize: 16, color: 'black' }}>{item.ViTri}</Text>
                                        {item.TrangThai == 2 &&
                                            <Text>Vui lòng nhập địa chỉ trung chuyển</Text>
                                        }

                                    </View>
                                </TouchableOpacity>
                                <View style={{ height: 1, width: '100%', backgroundColor: 'black' }}></View>
                            </View>
                        }
                    />
                }

                {dontra == 2 &&
                    <FlatList data={batCuoi}
                        renderItem={({ item }: any) =>
                            <View>
                                <TouchableOpacity onPress={() => chonDiemdon(item.Name, item.TrangThai)} style={{ paddingVertical: 15, flexDirection: 'row' }}>
                                    <IconIonicons name="car" size={28} color="#265ff0" style={{ marginTop: 6 }} />
                                    <View style={{ paddingLeft: 5 }}>
                                        <Text style={{ fontSize: 18, color: 'black', paddingBottom: 5 }}>{item.Name}</Text>
                                        <Text style={{ fontSize: 16, color: 'black' }}>{item.ViTri}</Text>
                                        {item.TrangThai == 2 &&
                                            <Text>Vui lòng nhập địa chỉ trung chuyển</Text>
                                        }
                                    </View>
                                </TouchableOpacity>
                                <View style={{ height: 1, width: '100%', backgroundColor: 'black' }}></View>
                            </View>
                        }
                    />
                }
            </View>

            {checkmodle == 2 &&
                <View style={{ width: '100%', height: '75%', backgroundColor: '#FFFFFF', position: 'absolute', top: 150, zIndex: 100000 }}>
                    <View style={{ padding: 20 }}>
                        <Text style={{ fontSize: 20, color: 'black' }}>Nhập địa chỉ trung chuyển</Text>
                        <TextInput multiline={true} onChangeText={(value) => setInput(value)} style={[styles.btnPhone]} placeholder="Nhập địa điểm " />
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 20 }}>
                            <TouchableOpacity onPress={() => setcheckmodle(1)} style={{ width: 150, height: 45, backgroundColor: 'white', borderColor: '#FF6600', borderWidth: 1, borderRadius: 2 }}><Text style={{ fontSize: 18, alignSelf: 'center', paddingTop: 10, color: '#FF6600' }}>Quay lại</Text></TouchableOpacity>
                            <TouchableOpacity onPress={() => chonDiemdon(input, 1)} style={{ width: 150, height: 45, backgroundColor: '#FF6600', borderRadius: 2 }}><Text style={{ fontSize: 18, alignSelf: 'center', paddingTop: 10, color: 'white' }}>Xác nhận</Text></TouchableOpacity>
                        </View>
                    </View>
                </View>
            }
            <View style={{ position: 'absolute', bottom: 5, width: '100%' }}>
                {DiemDi == '' || DiemTra == '' ?
                    <TouchableOpacity style={{ width: '100%', height: 40,marginBottom:15, backgroundColor: '#93969e', borderRadius: 12, alignItems: 'center', alignSelf: 'center' }}>
                        <Text style={{ color: 'white', padding: 10, fontSize: 15 }}>Đặt vé</Text>
                    </TouchableOpacity>
                    :
                    <TouchableOpacity onPress={() => datvexe()} style={{ width: '100%', height: 40,marginBottom:15, backgroundColor: '#FF6600', borderRadius: 12, alignItems: 'center', alignSelf: 'center' }}>
                        <Text style={{ color: 'white', padding: 10, fontSize: 15 }}>Đặt vé</Text>
                    </TouchableOpacity>
                }
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
        borderColor: '#c2c1be',
        borderRadius: 15,
        height: 150,
        marginTop: 35,
        fontSize: 16
    }
})
export default BookTicket