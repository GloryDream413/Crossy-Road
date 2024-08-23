/********************************************************************** The Road to Valhalla! ************************************************************************
 *                                                                                                                                                                   *
 *  📌📌📌📌📌📌📌📌📌📌📌📌📌📌📌📌📌📌📌📌📌📌📌📌📌📌📌📌📌📌📌📌📌📌📌📌📌📌📌📌📌📌📌📌📌📌📌📌📌📌📌📌📌📌📌📌📌📌📌📌           *
 *  📌                                                                                                                                                  📌         *
 *  📌                                                                                                                                                  📌        *
 *  📌     📌            📌    📌📌         📌           📌       📌         📌📌        📌             📌                      📌📌             📌        *
 *  📌      📌          📌    📌  📌        📌           📌       📌        📌  📌       📌             📌                     📌  📌            📌       *
 *  📌       📌        📌    📌    📌       📌           📌       📌       📌    📌      📌             📌                    📌    📌           📌       *
 *  📌        📌      📌    📌      📌      📌           📌       📌      📌      📌     📌             📌                   📌      📌          📌       *
 *  📌         📌    📌    📌📌📌📌📌     📌            📌📌📌📌📌    📌📌📌📌📌    📌              📌                  📌📌📌📌📌         📌       *
 *  📌          📌  📌    📌          📌    📌           📌       📌    📌         📌   📌              📌                 📌          📌        📌       *
 *  📌           📌📌    📌            📌   📌           📌       📌   📌           📌  📌              📌                📌            📌       📌       *
 *  📌            📌    📌              📌  📌📌📌📌📌 📌        📌  📌            📌 📌📌📌📌📌    📌📌📌📌📌📌   📌              📌      📌       *
 *  📌                                                                                                                                                  📌      *
 *  📌                                                                                                                                                  📌      *
 *  📌📌📌📌📌📌📌📌📌📌📌📌📌📌📌📌📌📌📌📌📌📌📌📌📌📌📌📌📌📌📌📌📌📌📌📌📌📌📌📌📌📌📌📌📌📌📌📌📌📌📌📌📌📌📌📌📌📌📌📌      *
 *                                                                                                                                                             *
 *  Project Type  : CrossyGame with NFT management                                                                                                            *
 *   Project ID   : 2024-2                                                                                                                                   *
 *   Client Info  : Private                                                                                                                                 *
 *    Developer   : Rothschild (Nickname)                                                                                                                  *
 *   Source Mode  : 100% Private                                                                                                                          *
 *   Description  : CrossyGame project with NFT as a service.                                                                                            *
 *  Writing Style : P0413-K0408-K1206                                                                                                                   *
 *                                                                                                                                                     *
 ********************************************************************** The Road to Valhalla! *********************************************************
 */

// Sample Libraries
import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';
import { useNavigation } from "@react-navigation/native";
import { View, Text, TextInput, Image, Platform, Dimensions, Linking, Switch, ScrollView } from 'react-native';

// Personal informations 
import HeaderScreen from "./HeaderScreen";

import { myFont } from '../global/myFont';

// Guide Page component
const LeaderboardScreen = () => {

    /* ================================ For Mobile Responsive ===============================*/

    const [evalWidth, setEvalWidth] = useState(768);
    const [isMobile, setIsMobile] = useState(Dimensions.get('window').width < evalWidth);
    const [isPC, setIsPC] = useState(Dimensions.get('window').width >= evalWidth);
    const [top10, setTop10] = useState(true);

    const [data, setData] = useState([
        { color: 'black', fontFamily: open, no: 1, name: 'Deagle', score: 1000 },
        { color: 'black', fontFamily: open, no: 2, name: 'Crypto Lead', score: 900 },
        { color: 'black', fontFamily: open, no: 3, name: 'GloryDream', score: 800 },
        { color: 'white', fontFamily: open, no: 4, name: 'BillyBob', score: 700 },
        { color: 'white', fontFamily: open, no: 6, name: 'AncientUnicorn38', score: 600 },
        { color: 'white', fontFamily: open, no: 7, name: 'Ghost_90', score: 500 },
        { color: 'white', fontFamily: open, no: 8, name: 'Firebase21', score: 400 },
        { color: 'white', fontFamily: open, no: 9, name: 'Sky_Dawn', score: 300 },
        { color: 'white', fontFamily: open, no: 10, name: 'Monica', score: 270 },
        { color: 'white', fontFamily: open, no: 11, name: 'Williams', score: 210 },
        { color: 'white', fontFamily: open, no: 12, name: 'Smith', score: 130 },
        { color: 'white', fontFamily: open, no: 13, name: 'Jacky', score: 100 },
        { color: 'white', fontFamily: open, no: 9, name: 'Sky_Dawn', score: 300 },
        { color: 'white', fontFamily: open, no: 10, name: 'Monica', score: 270 },
        { color: 'white', fontFamily: open, no: 11, name: 'Williams', score: 210 },
        { color: 'white', fontFamily: open, no: 12, name: 'Smith', score: 130 },
        { color: 'white', fontFamily: open, no: 13, name: 'Jacky', score: 100 },
        { color: 'white', fontFamily: open, no: 9, name: 'Sky_Dawn', score: 300 },
        { color: 'white', fontFamily: open, no: 10, name: 'Monica', score: 270 },
        { color: 'white', fontFamily: open, no: 11, name: 'Williams', score: 210 },
        { color: 'white', fontFamily: open, no: 12, name: 'Smith', score: 130 },
        { color: 'white', fontFamily: open, no: 13, name: 'Jacky', score: 100 },
        { color: 'white', fontFamily: open, no: 9, name: 'Sky_Dawn', score: 300 },
        { color: 'white', fontFamily: open, no: 10, name: 'Monica', score: 270 },
        { color: 'white', fontFamily: open, no: 11, name: 'Williams', score: 210 },
        { color: 'white', fontFamily: open, no: 12, name: 'Smith', score: 130 },
        { color: 'white', fontFamily: open, no: 13, name: 'Jacky', score: 100 },
        { color: 'white', fontFamily: open, no: 9, name: 'Sky_Dawn', score: 300 },
        { color: 'white', fontFamily: open, no: 10, name: 'Monica', score: 270 },
        { color: 'white', fontFamily: open, no: 11, name: 'Williams', score: 210 },
        { color: 'white', fontFamily: open, no: 12, name: 'Smith', score: 130 },
        { color: 'white', fontFamily: open, no: 13, name: 'Jacky', score: 100 },
    ]);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < evalWidth);
            setIsPC(window.innerWidth >= evalWidth);
        };
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    /* ================================ For Mobile Responsive ===============================*/


    // Initial Variables
    const navigation = useNavigation();

    const [path, setPath] = useState("leaderboard");

    const getRankStyle = (rank) => {
        if (rank == 1) {
            return { color: 'black', background: 'rgba(243, 179, 76, 1)', borderRadius: '50%', border: '2px solid yellow' }
        } else if (rank == 2) {
            return { color: 'black', background: 'gray', borderRadius: '50%', border: '2px solid white' }
        } else if (rank == 3) {
            return { color: 'black', background: 'rgba(200, 139, 76, 1)', borderRadius: '50%', border: '2px solid yellow' }
        }
        return { background: 'black', borderRadius: '50%', border: '2px solid white' }
    }

    // Receiving events from the server

    return (
        <View style={{
            display: 'flex',
            flexDirection: 'column',
            fontFamily: myFont,
        }}>
            <HeaderScreen path={path}></HeaderScreen>

            <View style={{
                position: 'relative',
                height: 'calc(100vh - 100px)',
                background: 'black',
                display: 'flex',
                flexDirection: isPC ? 'row' : 'column',
                alignItems: 'center',
                justifyContent: 'space-between',
            }}>
                {isPC &&
                    <View style={{
                        width: '50%', height: '100%',
                        display: 'flex',
                        borderRight: '1px solid white'
                    }}>
                        <Image source={require("../assets/avatar/avatar_player3.png")}
                            style={{
                                width: '100%', height: '100%',
                                margin: 'auto'
                            }}
                        />
                    </View>
                }

                <View style={{
                    position: 'relative',
                    display: 'flex',
                    flexDirection: 'column',
                    columnGap: '10px',
                    width: isPC ? '50%' : '100%',
                    height: '100%',
                    textAlign: 'center',
                    alignItems: 'center',
                    justifyContent: 'space-between'
                }}>
                    <View style={{
                        width: '100%',
                        height: isPC ? '300px' : '185px',
                        justifyContent: 'center',
                        alignItems: 'center',
                        borderBottom: '1px solid white',
                    }}>
                        <Text style={{ color: 'white', fontSize: '24px', fontFamily: myFont }}>Top Mobbers</Text>
                        <Text style={{
                            fontSize: isPC ? '60px' : '36px',
                            color: 'rgba(253, 198, 211, 1)',
                            WebkitTextStroke: '2px rgba(239, 88, 123, 1)',
                            filter: 'drop-shadow(3px 5px 8px #ff0000)',
                            fontWeight: '900',
                            textShadow: '0 0 5px #fff',
                        }}>Leaderboard</Text>
                        <View style={{
                            display: 'flex', flexDirection: 'row',
                            marginTop: '30px', alignItems: 'center',
                            columnGap: '10px'
                        }}>
                            <Text style={{
                                color: top10 ? 'gray' : 'white',
                                fontFamily: myFont,
                                fontSize: '20px'
                            }}>
                                Top 10 only
                            </Text>
                            <Switch
                                value={top10}
                                trackColor='gray'
                                thumbColor='green'
                                onValueChange={() => {
                                    setTop10(!top10);
                                }}
                            > </Switch>
                            <Text style={{
                                color: !top10 ? 'gray' : 'white',
                                fontFamily: myFont,
                                fontSize: '20px'
                            }}>
                                Global Players
                            </Text>
                        </View>
                    </View>
                    <ScrollView style={{
                        width: '50vw',
                        height: '600px',
                    }}>
                        {data.map((player, index) => {
                            return (<View style={{
                                display: 'flex', flexDirection: 'row',
                                width: '100%', justifyContent: 'space-between',
                                padding: '10px'
                            }}>
                                <Text style={{
                                    color: 'white', fontSize: '20px',
                                    width: '30px',

                                    borderRadius: '50%',
                                    ...getRankStyle(index + 1)
                                }}>{index + 1}</Text>
                                <Text style={{ color: 'white', fontSize: '20px', }}>{player.name}</Text>
                                <Text style={{ color: 'white', fontSize: '20px', }}>{player.score}</Text>
                            </View>);
                        })}
                    </ScrollView>



                </View>
            </View>

        </View >
    );
};

export default LeaderboardScreen;


{/* 
// on click of play button 
<button className="decoration-button" onClick={() => {
    if (userName !== "") {
        setGameMode(0);
        navigation.navigate("GameScreen");
    }
}} >Play !</button> 

// Join Server button
{serverId &&
    <button className="decoration-button" onClick={() => {
        if (userName == "") {
            window.alert("Enter UserName !");
            return;
        }

        socket.emit('message', JSON.stringify({
            cmd: 'JOIN_GAME',
            name: serverId,
            player2: userName
        }));

    }} >Join Server
    </button>}

// Create Private Room Button
<button className="decoration-button" onClick={() => {
    // Creating the room
    if (userName == "") {
        window.alert("Enter UserName !");
        return;
    }
    setOtherName("waiting...");

    socket.emit('message', JSON.stringify({
        cmd: 'CREATE_ROOM',
        player1: userName,
        map: globalMap
    }));
}}>Create Private Room</button>

 */}