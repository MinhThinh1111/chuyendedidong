import React, { useEffect, useState } from 'react';
import { StatusBar, StyleSheet, Text, TouchableOpacity, View, FlatList } from "react-native";
import { useNotes } from '../ConText/MyNote';
import axios from 'axios';

const MyTripScreen = ({ route, navigation }: any) => {
    const { IsNote, IsVeXe, SetVeXe, SetNote, getNote }: any = useNotes()
    const [VeXeHienTai, SetVeXeHienTai] = useState([])
    const [VeXeDaDi, setVeXeDaDi] = useState([])
    const [VeXeDaHuy, setVeXeDaHuy] = useState([])
    const [check, setcheck] = useState(1)

    if (route.params == undefined) {
        axios.get('http://192.168.1.2:3000/vexe/khachhang/' + IsNote.id + '/1').then((response) => {
            SetVeXeHienTai(response.data)
        });
    }

    const NextPage = (item: any,checkve: any) => {
        navigation.navigate('TicketInform', { data: item ,checkve: checkve});
    }

    const onPress = async (id: any) => {
        if(id == 2){
            axios.get('http://192.168.1.2:3000/vexe/khachhang/' + IsNote.id + '/2').then((response) => {
            setVeXeDaDi(response.data)
        });
        }else{
            axios.get('http://192.168.1.2:3000/vexe/khachhang/' + IsNote.id + '/3').then((response) => {
                setVeXeDaHuy(response.data)
            });
        }
        setcheck(id);
    }

    return (
        <>
            <StatusBar translucent={true} backgroundColor={'transparent'} barStyle="dark-content"></StatusBar>
            <View style={styles.header}>
                <Text style={styles.txtHeader}>Chuyến của tôi</Text>
            </View>
            <View style={{ backgroundColor: '#FF6600' }}>
                <View style={{ backgroundColor: 'white', height: '100%', borderRadius: 30, padding: 15 }}>
                    <View style={styles.status}>

                        {check == 1 ?
                            (<TouchableOpacity onPress={() => onPress(1)}>
                                <Text style={styles.text}>Hiện tại</Text>
                            </TouchableOpacity>
                            ) : (<TouchableOpacity onPress={() => onPress(1)}>
                                <Text style={styles.textcheck}>Hiện tại</Text>
                            </TouchableOpacity>
                            )
                        }

                        {check == 2 ?
                            (<TouchableOpacity onPress={() => onPress(2)}>
                                <Text style={styles.text}>Đã đi</Text>
                            </TouchableOpacity>
                            ) : (<TouchableOpacity onPress={() => onPress(2)}>
                                <Text style={styles.textcheck}>Đã đi</Text>
                            </TouchableOpacity>
                            )
                        }

                        {check == 3 ?
                            (<TouchableOpacity onPress={() => onPress(3)}>
                                <Text style={styles.text}>Đã huy</Text>
                            </TouchableOpacity>
                            ) : (<TouchableOpacity onPress={() => onPress(3)}>
                                <Text style={styles.textcheck}>Đã huy</Text>
                            </TouchableOpacity>
                            )
                        }
                    </View>
                    {check == 1 &&
                        <FlatList data={VeXeHienTai}
                            renderItem={({ item }: any) =>
                                <TouchableOpacity onPress={() => NextPage(item,1)}>
                                    <View style={styles.trip}>
                                        <View style={{ flexDirection: 'row', borderRadius: 25, backgroundColor: '#f25b0f', padding: 22 }}>
                                            <View style={{ width: '35%' }}>
                                                <Text style={{ color: '#3b3938', fontSize: 17 }}>Khởi hành</Text>
                                                <Text style={{ color: 'black', fontSize: 25, fontWeight: 'bold' }}>{item.GioDi}</Text>
                                                <Text style={{ color: '#3b3938', fontSize: 17 }}>Ngày</Text>
                                                <Text style={{ color: 'black', fontSize: 18, paddingBottom: 8 }}>{item.NgayDi}</Text>
                                                <Text style={{ color: '#3b3938', fontSize: 17 }}>Trạng thái</Text>
                                                <Text style={{ color: 'black', fontSize: 18 }}>{(item.thanhtoan == 1)? 'Chưa thanh toán tiền vé': 'Đã thanh toán tiền vé'}</Text>
                                            </View>
                                            <View style={{ width: 1, height: '100%', backgroundColor: 'white' }}></View>
                                            <View style={{ width: '64%', marginLeft: 10 }}>
                                                <Text style={{ color: '#3b3938', fontSize: 17 }}>Biển số xe</Text>
                                                <Text style={{ color: 'black', fontSize: 22, fontWeight: 'bold' }}>{item.BienSo}</Text>
                                                <Text style={{ color: '#3b3938', fontSize: 18 }}>Ghế</Text>
                                                <Text style={{ color: 'black', fontSize: 19, paddingBottom: 8 }}>{item.ChoNgoi}</Text>
                                                <Text style={{ color: '#3b3938', fontSize: 17 }}>Lộ Trinh</Text>
                                                <Text style={{ color: 'black', fontSize: 18 }}>{item.Ten}</Text>
                                            </View>
                                        </View>
                                    </View>
                                </TouchableOpacity>
                            }
                        />
                    }

                    {check == 2 &&
                        <FlatList data={VeXeDaDi}
                            renderItem={({ item }: any) =>
                                <TouchableOpacity onPress={() => NextPage(item,2)}>
                                    <View style={styles.trip}>
                                        <View style={{ flexDirection: 'row', borderRadius: 25, backgroundColor: '#f0efed', padding: 22 }}>
                                            <View style={{ width: '35%' }}>
                                                <Text style={{ color: '#3b3938', fontSize: 17 }}>Khởi hành</Text>
                                                <Text style={{ color: 'black', fontSize: 25, fontWeight: 'bold' }}>{item.GioDi}</Text>
                                                <Text style={{ color: '#3b3938', fontSize: 17 }}>Ngày</Text>
                                                <Text style={{ color: 'black', fontSize: 18, paddingBottom: 8 }}>{item.NgayDi}</Text>
                                                <Text style={{ color: '#3b3938', fontSize: 17 }}>Trạng thái</Text>
                                                <Text style={{ color: 'black', fontSize: 18 }}>Đã hoàn thành</Text>
                                            </View>
                                            <View style={{ width: 1, height: '100%', backgroundColor: 'white' }}></View>
                                            <View style={{ width: '64%', marginLeft: 10 }}>
                                                <Text style={{ color: '#3b3938', fontSize: 17 }}>Biển số xe</Text>
                                                <Text style={{ color: 'black', fontSize: 22, fontWeight: 'bold' }}>{item.BienSo}</Text>
                                                <Text style={{ color: '#3b3938', fontSize: 18 }}>Ghế</Text>
                                                <Text style={{ color: 'black', fontSize: 19, paddingBottom: 8 }}>{item.ChoNgoi}</Text>
                                                <Text style={{ color: '#3b3938', fontSize: 17 }}>Lộ Trinh</Text>
                                                <Text style={{ color: 'black', fontSize: 18 }}>{item.Ten}</Text>
                                            </View>
                                        </View>
                                    </View>
                                </TouchableOpacity>
                            }
                        />
                    }

                    {check == 3 &&
                        <FlatList data={VeXeDaHuy}
                            renderItem={({ item }: any) =>
                                <TouchableOpacity onPress={() => NextPage(item,2)}>
                                    <View style={styles.trip}>
                                        <View style={{ flexDirection: 'row', borderRadius: 25, backgroundColor: '#f0efed', padding: 22 }}>
                                            <View style={{ width: '35%' }}>
                                                <Text style={{ color: '#3b3938', fontSize: 17 }}>Khởi hành</Text>
                                                <Text style={{ color: 'black', fontSize: 25, fontWeight: 'bold' }}>{item.GioDi}</Text>
                                                <Text style={{ color: '#3b3938', fontSize: 17 }}>Ngày</Text>
                                                <Text style={{ color: 'black', fontSize: 18, paddingBottom: 8 }}>{item.NgayDi}</Text>
                                                <Text style={{ color: '#3b3938', fontSize: 17 }}>Trạng thái</Text>
                                                <Text style={{ color: 'black', fontSize: 18 }}>Đã huy vé</Text>
                                            </View>
                                            <View style={{ width: 1, height: '100%', backgroundColor: 'white' }}></View>
                                            <View style={{ width: '64%', marginLeft: 10 }}>
                                                <Text style={{ color: '#3b3938', fontSize: 17 }}>Biển số xe</Text>
                                                <Text style={{ color: 'black', fontSize: 22, fontWeight: 'bold' }}>{item.BienSo}</Text>
                                                <Text style={{ color: '#3b3938', fontSize: 18 }}>Ghế</Text>
                                                <Text style={{ color: 'black', fontSize: 19, paddingBottom: 8 }}>{item.ChoNgoi}</Text>
                                                <Text style={{ color: '#3b3938', fontSize: 17 }}>Lộ Trinh</Text>
                                                <Text style={{ color: 'black', fontSize: 18 }}>{item.Ten}</Text>
                                            </View>
                                        </View>
                                    </View>
                                </TouchableOpacity>
                            }
                        />
                    }


                    <View style={{ marginTop: 100 }}></View>


                </View>
            </View>
        </>
    )
}

const styles = StyleSheet.create({
    header: {
        width: '100%',
        backgroundColor: '#FF6600',
        height: 100
    },
    txtHeader: {
        marginTop: 50,
        color: 'white',
        fontSize: 20,
        fontWeight: 'bold',
        alignSelf: 'center',
    },
    status: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 6,
        borderRadius: 20,
        backgroundColor: '#FFCCCC',
        marginTop: 10,
        elevation: 4,
        shadowColor: '#555555',
        alignItems: 'center'
    },

    trip: {

        elevation: 10,
        shadowColor: '#4d4d4d',
        marginTop: 30,
    },
    text: {
        backgroundColor: 'white',
        borderRadius: 10,
        fontSize: 15,
        paddingHorizontal: 25,
        paddingVertical: 6,
        color: 'red',
        alignSelf: 'center',
    },

    textcheck: {
        borderRadius: 10,
        fontSize: 15,
        paddingHorizontal: 25,
        paddingVertical: 6,
        color: 'black',
        alignSelf: 'center',
    },

    text1: {
        fontSize: 16,
        color: 'black',
        paddingHorizontal: 22,

    },
    text2: {
        fontSize: 25,
        color: 'black',
        paddingHorizontal: 22,
        paddingVertical: 12,
        fontWeight: 'bold',
    }


})

export default MyTripScreen;