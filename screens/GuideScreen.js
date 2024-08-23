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
import { View, Text, TextInput, Image, Platform, Dimensions, Linking } from 'react-native';

// Personal informations 
import HeaderScreen from "./HeaderScreen";

import { myFont } from '../global/myFont';

// Guide Page component
const GuideScreen = () => {

    /* ================================ For Mobile Responsive ===============================*/

    const [evalWidth, setEvalWidth] = useState(768);
    const [isMobile, setIsMobile] = useState(Dimensions.get('window').width < evalWidth);
    const [isPC, setIsPC] = useState(Dimensions.get('window').width >= evalWidth);

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

    const [path, setPath] = useState("guide");

    // Receiving events from the server

    return (
        <View style={{
            display: 'flex',
            flexDirection: 'column',
            fontFamily: myFont
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
                }}>
                    <View style={{
                        width: '100%',
                        height: isPC ? '300px' : '185px',
                        borderBottom: '1px solid white',
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}>
                        <Text style={{ color: 'white', fontSize: '24px', fontFamily: myFont }}>Welcome To</Text>
                        <Text style={{
                            fontSize: isPC ? '60px' : '36px',
                            color: 'rgba(253, 198, 211, 1)',
                            WebkitTextStroke: '2px rgba(239, 88, 123, 1)',
                            filter: 'drop-shadow(3px 5px 8px #ff0000)',
                            fontWeight: '900',
                            textShadow: '0 0 5px #fff',
                        }}>How to Play</Text>
                    </View>
                    <View style={{
                        width: '100%',
                        
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}>

                        <Text style={{ marginTop: '32px', color: 'white', fontSize: '40px', fontFamily: myFont }}>
                            Title Here
                        </Text>

                        <Text style={{ marginTop: '20px', color: 'white', fontSize: '16px', fontFamily: myFont, width: '70%', textAlign: 'center' }}>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus tortor tortor, convallis id maximus non, semper eu sapien. Aliquam efficitur urna ac sapien ornare, vitae ornare nunc placerat. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Morbi massa ante, accumsan quis sollicitudin ut, sodales eget sapien. Praesent rhoncus elit et urna cursus facilisis.
                        </Text>

                        <Text style={{ marginTop: '20px', color: 'white', fontSize: '16px', fontFamily: myFont, width: '70%', textAlign: 'center' }}>
                            Suspendisse potenti. Quisque tristique eros id dui ultrices fringilla. Vivamus luctus magna urna, at gravida turpis cursus eu. Donec nec eros lobortis, venenatis lectus vitae, sagittis velit. Nulla sed sollicitudin metus. Mauris eget finibus nisi, et convallis ex. Mauris enim nunc, molestie vel porta ac, aliquet sit amet mauris. Pellentesque id feugiat purus.
                        </Text>
                    </View>



                </View>
            </View>

        </View >
    );
};

export default GuideScreen;


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