import React, { useEffect, useState } from "react";
import { Image, StatusBar, StyleSheet, Text, TextInput, TouchableOpacity, View, ScrollView, FlatList } from "react-native";
import Icon from 'react-native-vector-icons/Ionicons';
import IconFontisto from "react-native-vector-icons/Fontisto";
import { useNavigation } from '@react-navigation/native';
import Waiting from "./Waiting";
const TripListScreens = ({ route }: any) => {
    const navigation = useNavigation()
    const { NgayDi, idLoTrinh, toAdderss, fromAdderss } = route.params;
    const [chuyenDi, setchuyenDi] = useState([]);
    let i = '2023-11-3'
    const getChuyenDiByIdLoTrinhNgayDi = async () => {
        try {
            const res = await fetch('http://192.168.1.2:3000/chuyendi/search/' +idLoTrinh+ '/' + NgayDi);
            const data = await res.json();
            setchuyenDi(data)
        } catch (err) {
            console.log(err);
        }
    }

    const nextPage = (id:any,idxe:any,giaTien:any) =>{
        navigation.navigate('ChooseSeat',{Id_ChuyenDi:id,Id_Xe:idxe,giaTien:giaTien})
    }
    useEffect(() => {
        getChuyenDiByIdLoTrinhNgayDi();
    }, [])
    return (
        <>
            <View style={styles.header}>
                <StatusBar translucent={true} backgroundColor={'transparent'} barStyle="dark-content"></StatusBar>
                <Image style={{ width: '100%', height: 200 }} source={require('../assets/Images/Ticker.jpg')}></Image>
                <View style={styles.headerName}>
                    <TouchableOpacity onPress={() => navigation.goBack()} style={{ marginTop: -10 }} ><Icon style={{ backgroundColor: 'white', padding: 12, borderRadius: 10 }} name="arrow-back" size={20} color="red" /></TouchableOpacity>
                    <Text style={{ fontSize: 20, color: 'white' }}>{toAdderss}</Text>
                    <Icon name="arrow-forward" size={26} color="white" />
                    <Text style={{ fontSize: 20, color: 'white' }}>{fromAdderss}</Text>
                </View>
            </View>
            <View style={styles.date}>
                <TouchableOpacity>
                    <IconFontisto name="date" size={20} color='white'></IconFontisto>
                </TouchableOpacity>
                <View>
                    <Text style={{ color: 'white' }}>     Khởi hành</Text>
                    <Text style={{ color: 'white', fontSize: 17 }}> {NgayDi}</Text>
                </View>
                <IconFontisto name="nav-icon-list-a" size={20} color='white'></IconFontisto>
            </View>

            <View style={{ backgroundColor: '#DDDDDD', flex: 1, height: '100%', borderTopRightRadius: 20, top: -18, borderTopLeftRadius: 20 }}>
                {chuyenDi.length == 0 && <View>
                    {/* <Text style={{ marginTop: 90, alignSelf: 'center', fontSize: 24, color: 'black', fontWeight: 'bold' }}>Không tìm thấy chuyến xe </Text>
                    <Text style={{ alignSelf: 'center', fontSize: 16, color: 'black', }}>các chuyến xe trong ngày tạm hết vé.</Text>
                    <Text style={{ alignSelf: 'center', fontSize: 16, color: 'black', }}>quý khách vui lòng thử lại sau hoặc chọn </Text>
                    <Text style={{ alignSelf: 'center', fontSize: 16, color: 'black', }}>ngày khởi hành khác</Text> */}
                    <Waiting></Waiting>
                </View>}

                <View style={{ marginBottom: 12 }}></View>
                <FlatList data={chuyenDi}
                    renderItem={({ item }: any) =>
                        <TouchableOpacity onPress={() => nextPage(item.Id,item.Id_Xe,item.Gia_Tien)}>
                            <View style={{ padding: 10, backgroundColor: 'white', width: '92%', alignSelf: 'center', marginTop: 12, borderRadius: 20 }}>
                                <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 10 }}>
                                    <Text style={{ fontSize: 15, color: 'black', width: '65%' }}>Giường nằm {item.SoGheTrong} chố (có wc)</Text>
                                    <Text style={{}}>Còn {item.SoGheTrong} chố trống</Text>
                                </View>
                                <View style={{ height: 1, backgroundColor: '#C0C0C0' }}></View>
                                <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginTop: 5 }}>
                                    <Text style={{ fontSize: 25, fontWeight: 'bold', color: 'black', width: '20%'}}>{item.GioDi}</Text>
                                    <IconFontisto style={{}} name="record" size={10} color='red'></IconFontisto>
                                    <View style={{ height: 2, width: '21%', backgroundColor: 'red' }}></View>
                                    <Text style={{}}> {item.TongThoiGian}H </Text>
                                    <View style={{ height: 2, width: '21%', backgroundColor: 'red' }}></View>
                                    <IconFontisto style={{}} name="record" size={10} color='red'></IconFontisto>
                                    <Text style={{ fontSize: 25, fontWeight: 'bold', color: 'black', width: '22%', paddingLeft: 5 }}>{item.GioDen}</Text>
                                </View>
                                <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 10 }}>
                                    <Text style={{ fontSize: 15, color: 'black', width: '50%' }}>{item.Diem_Bat_Dau}</Text>
                                    <Text style={{ fontSize: 15, color: 'black', width: '50%' }}>{item.Diem_Ket_Thuc}</Text>
                                </View>
                                <View style={{ height: 1, backgroundColor: '#C0C0C0' }}></View>
                                <Text style={{ fontSize: 19, color: 'black', paddingTop: 12, paddingLeft: 180, fontWeight: 'bold' }}> {item.Gia_Tien} VND</Text>
                            </View>
                        </TouchableOpacity>
                    }
                />
            </View>
            <View style={{ marginBottom: 12 }}>
            </View>
        </>
    )
}

const styles = StyleSheet.create({
    header: {
        width: '100%',
        backgroundColor: 'red',
        height: 170
    },
    headerName: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 12,
        top: -120

    },
    date: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 20,
        backgroundColor: '#FF6600',
        borderTopEndRadius: 25,
        borderTopStartRadius: 25,
        height: '12%'
    }
})

export default TripListScreens;