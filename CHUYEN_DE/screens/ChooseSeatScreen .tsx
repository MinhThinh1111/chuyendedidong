import React, { useEffect, useState } from "react";
import { Alert, FlatList, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { StatusBar } from "react-native";
import IconIonicons from "react-native-vector-icons/Ionicons";
import IconEntypo from "react-native-vector-icons/Entypo";
import { useNavigation } from "@react-navigation/native";
const ChooseSeatScreen = ({ route, navigation }: any) => {
    const { Id_ChuyenDi, Id_Xe, giaTien, SoGhe } = route.params;
    const [ListGheXeT1, setListGheXeT1] = useState([])
    const [ListGheXeT2, setListGheXeT2] = useState([])
    const [Tang, setTang] = useState(1)
    const collectionDatVeXe: any = {};
    const [soLuong, setsoLuong] = useState(0)

    const GhetGheXeByChuyenDi = async () => {
        try {
            // const res = await fetch('http://192.168.1.2:3000/chongoi/search/' + Id_ChuyenDi);
            const res = await fetch('http://192.168.1.2:3000/chongoi/search/' + Id_ChuyenDi);
            const data = await res.json();
            if (data != null) {
                for (let index = 0; index < data.length; index++) {
                    collectionDatVeXe[data[index].Id_ChuyenDi + data[index].Id_GheXe] = '1';
                }
            }
        } catch (err) {
            console.log(err);
        }
        try {
            const res = await fetch('http://192.168.1.2:3000/ghexe/search/' + Id_Xe + '/1');
            // const res = await fetch('http://192.168.1.2:3000/ghexe/search/' + Id_Xe + '/1');
            const data = await res.json();

            if (data != null) {
                const List: any = [];
                for (let index = 0; index < data.length; index++) {
                    List.push({
                        Id: data[index].Id,
                        Ten: data[index].Ten,
                        Id_Xe: data[index].Id_Xe,
                        TrangThai: collectionDatVeXe[data[index].Id + Id_ChuyenDi] == undefined ? '1' : '2',
                        Index: index,
                        SoGhe: data[index].SoGhe,
                    });
                }
                setListGheXeT1(List)
            }
        } catch (err) {
            console.log(err);
        }
        try {
            const res = await fetch('http://192.168.1.2:3000/ghexe/search/' + Id_Xe + '/2');
            // const res = await fetch('http://192.168.1.2:3000/ghexe/search/' + Id_Xe + '/2');
            const data = await res.json();
            if (data != null) {
                const List: any = [];
                for (let index = 0; index < data.length; index++) {
                    List.push({
                        Id: data[index].Id,
                        Ten: data[index].Ten,
                        Id_Xe: data[index].Id_Xe,
                        TrangThai: collectionDatVeXe[data[index].Id + Id_ChuyenDi] == undefined ? '1' : '2',
                        Index: index,
                        SoGhe: data[index].SoGhe,
                    });


                }
                setListGheXeT2(List)
            }
        } catch (err) {
            console.log(err);
        }
    }

    const Chonchongoi = async (Index: any, check: any) => {

        if (check == 1) {
            if (ListGheXeT1[Index].TrangThai == '3') {
                let so = soLuong - 1;
                setsoLuong(so);
                ListGheXeT1[Index] = { Id: ListGheXeT1[Index].Id, Ten: ListGheXeT1[Index].Ten, Id_Xe: ListGheXeT1[Index].Id_Xe, TrangThai: '1', Index: Index, SoGhe: ListGheXeT1[Index].SoGhe };
            } else {
                if (soLuong > 3) {
                    Alert.alert("Thông báo", "Quý khách chỉ được chọn tối đa 4 ghế cho mỗi lần đặt")

                } else {
                    let so = soLuong + 1;
                    setsoLuong(so)
                    ListGheXeT1[Index] = { Id: ListGheXeT1[Index].Id, Ten: ListGheXeT1[Index].Ten, Id_Xe: ListGheXeT1[Index].Id_Xe, TrangThai: '3', Index: Index, SoGhe: ListGheXeT1[Index].SoGhe };
                }
            }
            const List: any = [];
            for (let index = 0; index < ListGheXeT1.length; index++) {
                await List.push(ListGheXeT1[index]);
            }
            await setListGheXeT1(List)
        } else {
            if (ListGheXeT2[Index].TrangThai == '3') {
                let so = soLuong - 1;
                setsoLuong(so);
                ListGheXeT2[Index] = { Id: ListGheXeT2[Index].Id, Ten: ListGheXeT2[Index].Ten, Id_Xe: ListGheXeT2[Index].Id_Xe, TrangThai: '1', Index: Index, SoGhe: ListGheXeT2[Index].SoGhe };
            } else {
                if (soLuong > 3) {
                    Alert.alert("Thông báo", "Quý khách chỉ được chọn tối đa 4 ghế cho mỗi lần đặt")

                } else {
                    let so = soLuong + 1;
                    setsoLuong(so)
                    ListGheXeT2[Index] = { Id: ListGheXeT2[Index].Id, Ten: ListGheXeT2[Index].Ten, Id_Xe: ListGheXeT2[Index].Id_Xe, TrangThai: '3', Index: Index, SoGhe: ListGheXeT2[Index].SoGhe };
                }
            }
            const List: any = [];
            for (let index = 0; index < ListGheXeT2.length; index++) {
                await List.push(ListGheXeT2[index]);
            }
            await setListGheXeT2(List)
        }

    }

    const getDatveTang1 = async () => {

    }

    const nextPage = async () => {
        const List: any = [];
        for (let index = 0; index < ListGheXeT1.length; index++) {
            if (ListGheXeT1[index].TrangThai === '3') {
                await List.push({
                    Id: ListGheXeT1[index].Id
                })
            }

        }
        for (let index = 0; index < ListGheXeT2.length; index++) {
            if (ListGheXeT2[index].TrangThai === '3') {
                await List.push({
                    Id: ListGheXeT1[index].Id
                })
            }
        }
        navigation.navigate('BookTicket', { data: List, Id_ChuyenDi: Id_ChuyenDi, TongTien: (250000 * soLuong) });
    }

    useEffect(() => {
        GhetGheXeByChuyenDi()
    }, [])
    return (
        <>
            <StatusBar translucent={true} backgroundColor={'transparent'} barStyle="dark-content"></StatusBar>
            <View style={{ height: 42, backgroundColor: '#FF6600' }}></View>
            <View style={{ backgroundColor: '#FFFFFF', justifyContent: "space-between", flexDirection: 'row', padding: 15 }}>
                <TouchableOpacity onPress={() => navigation.goBack()}><IconIonicons name="chevron-back" size={28} color="black" /></TouchableOpacity>
                <Text style={{ color: 'black', fontWeight: 'bold', fontSize: 20 }}>Chọn ghế</Text>
                <Text>      </Text>
            </View>
            <View style={{ height: 1, backgroundColor: '#dee3e0' }}></View>

            <View style={{ padding: 15, flexDirection: 'row', backgroundColor: '#FFFFFF', }}>
                <View style={{ width: '50%' }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', paddingVertical: 15 }}>
                        <IconEntypo name="squared-cross" size={38} color="#DDDDDD" />
                        <Text>   Đã bán</Text>
                    </View>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <IconIonicons name="square-outline" size={38} color="#00CCFF" />
                        <Text>   Đang chọn</Text>
                    </View>
                </View>
                <View>
                    <View style={{ flexDirection: 'row', alignItems: 'center', paddingVertical: 15 }}>
                        <IconIonicons name="square-outline" size={38} color="black" />
                        <Text>   Chưa đặt</Text>
                    </View>
                </View>
            </View>
            <ScrollView>
                <View style={{ backgroundColor: '#FFFFFF' }}>
                    <View style={{ backgroundColor: '#f2f0f0', borderRadius: 30, padding: 15 }}>
                        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                            <TouchableOpacity onPress={() => setTang(1)} style={{ padding: 20 }}><Text style={{ color: 'black', fontSize: 18, fontWeight: 'bold' }}>Tầng 1</Text></TouchableOpacity>

                            <TouchableOpacity onPress={() => setTang(2)} style={{ padding: 20 }}><Text style={{ color: 'black', fontSize: 18, fontWeight: 'bold' }}>Tầng 2</Text></TouchableOpacity>
                        </View>
                        <View style={{ backgroundColor: '#CCCCCC', height: 1, marginBottom: 12 }}>
                        </View>
                        {Tang == 1 &&
                            <View style={{ alignContent: 'center', alignSelf: 'center', width: '90%', height: 330, flexWrap: 'wrap' }}>
                                {ListGheXeT1.map((item: any) => {
                                    return <View key={item.Id}>

                                        {item.TrangThai == '1' ?
                                            <TouchableOpacity style={{ paddingHorizontal: 35 }} onPress={() => Chonchongoi(item.Index, 1)}><IconIonicons name="square-outline" size={(item.SoGhe == 20) ? 60 : 50} color="black" /></TouchableOpacity>
                                            : item.TrangThai == '2' ?
                                                <Text style={{ paddingHorizontal: 34 }}><IconEntypo name="squared-cross" size={(item.SoGhe == 20) ? 60 : 50} color="#DDDDDD" /></Text>
                                                :
                                                <TouchableOpacity style={{ paddingHorizontal: 35 }} onPress={() => Chonchongoi(item.Index, 1)}><IconIonicons name="square-outline" size={(item.SoGhe == 20) ? 60 : 50} color="#00CCFF" /></TouchableOpacity>
                                        }
                                    </View>
                                })}
                            </View>
                        }

                        {Tang == 2 &&
                            <View style={{ alignContent: 'center', alignSelf: 'center', width: '90%', height: 330, flexWrap: 'wrap' }}>
                                {ListGheXeT2.map((item: any) => {
                                    return <View key={item.Id}>

                                        {item.TrangThai == '1' ?
                                            <TouchableOpacity style={{ paddingHorizontal: 35 }} onPress={() => Chonchongoi(item.Index, 2)}><IconIonicons name="square-outline" size={(item.SoGhe == 20) ? 60 : 50} color="black" /></TouchableOpacity>
                                            : item.TrangThai == '2' ?
                                                <Text style={{ paddingHorizontal: 34 }}><IconEntypo name="squared-cross" size={(item.SoGhe == 20) ? 60 : 50} color="#DDDDDD" /></Text>
                                                :
                                                <TouchableOpacity style={{ paddingHorizontal: 35 }} onPress={() => Chonchongoi(item.Index, 2)}><IconIonicons name="square-outline" size={(item.SoGhe == 20) ? 60 : 50} color="#00CCFF" /></TouchableOpacity>
                                        }
                                    </View>
                                })}
                            </View>
                        }
                    </View>
                    {soLuong > 0 &&
                        <View style={{ marginTop: 20, justifyContent: 'space-between', flexDirection: 'row', padding: 10 }}>
                            <View><Text style={{ color: 'black', fontSize: 18 }}>Số Lượng : {soLuong} chố</Text>
                                <Text style={{ color: 'black', fontSize: 20, fontWeight: 'bold' }}>{giaTien * soLuong} VND</Text></View>
                            <TouchableOpacity onPress={() => nextPage()} style={{ backgroundColor: 'red', height: 40, alignItems: 'center', borderRadius: 2 }}><Text style={{ color: 'white', paddingTop: 8, fontSize: 15, paddingHorizontal: 15 }}>Tiếp Tục</Text></TouchableOpacity></View>
                    }
                </View>
            </ScrollView>
        </>
    )
}
export default ChooseSeatScreen