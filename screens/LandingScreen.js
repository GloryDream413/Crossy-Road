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
import GameContext from '../context/GameContext';
import ServerListDialog from './ServerListDialog';
import { globalMap } from "../global/globalMap";
import { keyMap_1, keyMap_2, keyMap_Both, keyMap_None } from "../global/keyMap";
import JoiningDialog from './JoiningDialog';
import HighScoreDialog from './HighScore';
import HeaderScreen from "./HeaderScreen";

import { myFont } from '../global/myFont';

// Global variables : MBC-on mobile responsive
export const FRONTEND_URL = "http://192.168.140.49:19006";
// export const FRONTEND_URL = "https://valhalla.proskillowner.com";
export const SERVER_URL = "https://valhalla.proskillowner.com";
export const socket = io(SERVER_URL);

// Landing Page component
const LandingScreen = () => {

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
    const {
        // set the socket to the context
        setSocket,
        // set gameMode to the context
        gameMode, setGameMode,
        // set the globalKepMap to the context : MBC-on update
        keyMap_Server, setKeyMap_Server,
        // set the role to the context : MBC-on on update
        role, setRole,
        // set the global map to the context 
        contextGameMap, setContextGameMap } = React.useContext(GameContext);

    // Initial hook functions 
    useEffect(() => {
        setSocket(socket);
        Linking.getInitialURL().then(url => {
            if (url) {
                const _serverId = url.split('/?')[1];
                console.log("server id : ", _serverId);
                if (_serverId) {
                    setServerId(_serverId);
                }
                setRoomPath(FRONTEND_URL + "/?" + _serverId);
            }
        }).catch(err => console.error('An error occurred', err));
    }, []);

    // Personal variables
    const [isLoading, setIsLoading] = useState(true);
    const [loadingPercent, setLoadingPercent] = useState(1);
    const [userName, setUserName] = useState("");
    const [cUserName, setCUserName] = useState("");
    const [otherName, setOtherName] = useState("waiting...");

    const [roomPath, setRoomPath] = useState(FRONTEND_URL);
    const [openRoom, setOpenRoom] = useState(false);
    const [openHighScore, setOpenHighScore] = useState(false);
    const [serverId, setServerId] = useState('');

    // Receiving events from the server
    useEffect(() => {
        const handleSocketMessage = (data) => {
            if (data.cmd === "ROOM_CREATED") {
                setRole('server');
                setGameMode(2);
                setRoomPath(FRONTEND_URL + "/?" + data.name);
                setOpenRoom(true);
            }
        };
        const handleSocketRoom = (data) => {

            console.log("Received : ", data);

            if (data.cmd == "GOT_JOINED_TO_CLIENT") {
                if (data.state) {
                    setRole('client');
                    setGameMode(2);
                    setContextGameMap(data.globalMap);
                    setOtherName(data.player1);
                    setOpenRoom(true);
                } else {
                    window.alert(data.reason);
                }

            }
            if (data.cmd == "GOT_JOINED_TO_SERVER") {
                // window.alert("setRole('server');");
                console.log("JOined : ", data);
                setRole('server');
                setGameMode(2);
                setContextGameMap(data.globalMap);
                setOtherName(data.player2);
            }
            if (data.cmd == "START_GAME_APPROVED") {
                // window.alert("ROLE:", role);
                navigation.navigate("GameScreen_2");
            }
        }

        socket.on('message', handleSocketMessage);
        socket.on('ROOM', handleSocketRoom);

        return () => {
            socket.off('message', handleSocketMessage);
            socket.off('ROOM', handleSocketRoom);
        };
    }, []);

    return (
        <View style={{
            display: 'flex',
            flexDirection: 'column',
            fontFamily: myFont
        }}>
            <JoiningDialog
                userName={userName}
                otherName={otherName}
                roomPath={roomPath}
                opened={openRoom}
                serverId={serverId}
                onClose={setOpenRoom}
            />
            <HighScoreDialog
                opened={openHighScore}
                onClose={setOpenHighScore}
            />

            <HeaderScreen></HeaderScreen>

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
                        <Image source={cUserName == "" ? require("../assets/avatar/avatar_player1.png") : require("../assets/avatar/avatar_player2.png")}
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
                    textAlign: 'center',
                    alignItems: 'center',
                    // rowGap: '25px',
                    padding: '25px'
                }}>
                    <Text style={{ color: 'white', fontSize: '24px', fontFamily: myFont }}>Welcome To</Text>
                    <Text style={{
                        fontSize: '72px',
                        color: 'rgba(253, 198, 211, 1)',
                        WebkitTextStroke: '2px rgba(239, 88, 123, 1)',
                        filter: 'drop-shadow(3px 5px 8px #ff0000)',
                        fontWeight: '900',
                        textShadow: '0 0 5px #fff'
                    }}>MOBBER</Text>

                    {cUserName != "" ?
                        <>
                            <Text style={{ marginTop: '20px', color: 'white', fontSize: '24px', fontFamily: myFont }}>
                                Hey, {cUserName} !
                            </Text>
                            <Text style={{ marginTop: '10px', color: 'white', fontSize: '18px', fontFamily: myFont }}>
                                Choose your Game
                            </Text>

                            <View style={{
                                display: 'flex',
                                flexDirection: 'row',
                                alignItems : 'center',
                                columnGap : '10px',
                                marginTop : '25px'
                            }}>
                                <View style={{
                                    padding: '10px',
                                    background: 'rgba(239, 88, 123, 1)',
                                    boxShadow: '0px 3px 10px red',
                                    borderRadius: '20px',
                                    color: 'white',
                                    cursor: 'pointer',
                                    marginTop: '20px',
                                }}
                                >
                                    Play Single - P2E

                                </View>

                                <Text style={{ marginTop: '20px', color: 'gray', 
                                    fontSize: '18px', fontFamily: myFont }}>
                                    OR
                                </Text>

                                <View style={{
                                    padding: '10px',
                                    background: 'rgba(239, 88, 123, 1)',
                                    boxShadow: '0px 3px 10px red',
                                    borderRadius: '20px',
                                    color: 'white',
                                    cursor: 'pointer',
                                    marginTop: '20px'
                                }}
                                >
                                    Play Multi - PVP
                                </View>
                            </View>

                        </>
                        :
                        <>
                            <TextInput style={{
                                padding: '0.5rem',
                                flex: 1,
                                border: '1px solid gray',
                                borderRadius: '30px',
                                background: 'transparent',
                                marginTop: '20px',
                                textAlign: 'center',
                                lineHeight: '2',
                                color: 'white'
                            }}
                                type="text" placeholder="Your Name"
                                value={userName}
                                onChange={(e) => {
                                    setUserName(e.target.value);
                                }}
                                autoFocus />
                            <View style={{
                                padding: '10px',
                                background: 'rgba(239, 88, 123, 1)',
                                boxShadow: '0px 3px 10px red',
                                borderRadius: '20px',
                                color: 'white',
                                cursor: 'pointer',
                                marginTop: '20px'
                            }}
                                onClick={() => {
                                    setCUserName(userName);
                                }}
                            >
                                Enter Mobber
                            </View>
                        </>
                    }


                </View>

                {isMobile &&
                    <Image source={cUserName == "" ? require("../assets/avatar/avatar_player1.png") : require("../assets/avatar/avatar_player2.png")}
                        style={{
                            width: '100%', height: '50%',
                        }}
                    />}
            </View>

        </View >
    );
};

export default LandingScreen;


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