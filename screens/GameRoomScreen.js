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
import HeaderScreen from "./HeaderScreen";
import { myFont } from '../global/myFont';

// Guide Page component
const GameRoomScreen = () => {

    /* ================================ For Mobile Responsive ===============================*/

    const [evalWidth, setEvalWidth] = useState(768);
    const [isMobile, setIsMobile] = useState(Dimensions.get('window').width < evalWidth);
    const [isPC, setIsPC] = useState(Dimensions.get('window').width >= evalWidth);

    useEffect(() => {

        console.log("GameRoomScreen : ", myRoomInfo);

        if (myRoomInfo.room_state != 'opened') {
            window.alert("Room Not Created !");
        }

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
        gameMode, myRoomInfo, role, setMyRoomInfo,
    } = React.useContext(GameContext);

    const [path, setPath] = useState("room");
    const [copied, setCopied] = useState(false);

    const reduceString = (str, len = isPC ? 40 : 38) => {
        if (str.toString().length <= len)
            return str;
        return str.slice(0, 20) + "..." + str.slice(-15);
    }

    const readFromClipboard = () => {
        // Create a temporary input element
        const input = document.createElement('input');
        document.body.appendChild(input);
        input.style.position = 'absolute'; // Position it off-screen
        input.style.opacity = '0'; // Make it invisible
        input.focus();

        // Allow the user to paste into the input field
        input.select();
        document.execCommand('paste'); // This may not work in all browsers

        // Get the pasted text
        const text = input.value;
        console.log(text);

        // Clean up the input element
        document.body.removeChild(input);
    };

    const copyToClipboard = (value) => {
        const textArea = document.createElement('textarea');
        textArea.value = value;
        document.body.appendChild(textArea);
        textArea.select();

        try {
            document.execCommand('copy');
            setCopied(true);
        } catch (err) {
            console.error('Failed to copy text: ', err);
        }

        document.body.removeChild(textArea);
    };


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
                        <Image source={require("../assets/avatar/avatar_player4.png")}
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
                    width: isPC ? '50%' : '100%',
                    height: '100%',
                    textAlign: 'center',
                    alignItems: 'center',
                    justifyContent: isMobile ? 'flex-end' : 'center',
                    rowGap: isPC ? '20px' : '10px',
                }}>

                    <Text style={{ color: 'white', fontSize: '24px', fontFamily: myFont }}>Multiplayer Robby</Text>
                    <Text style={{
                        fontSize: isPC ? '60px' : '36px',
                        color: 'rgba(253, 198, 211, 1)',
                        WebkitTextStroke: '2px rgba(239, 88, 123, 1)',
                        filter: 'drop-shadow(3px 5px 8px #ff0000)',
                        fontWeight: '900',
                        textShadow: '0 0 5px #fff',
                    }}>HANG TIGHT...</Text>
                    <View style={{
                        display: 'flex', flexDirection: 'row',
                        justifyContent: 'center', alignItems: 'center',
                        columnGap: '10px'
                    }}>
                        <View style={{ display: "flex", flexDirection: 'column', justifyContent: 'center', alignItems: 'center', rowGap: '10px' }}>
                            <Image source={
                                myRoomInfo.players[0].player_state ? require("../assets/avatar/avatar_player4.png") : require("../assets/avatar/avatar_empty.png")}
                                style={{ width: isPC ? '100px' : '60px', height: isPC ? '100px' : '60px', border: myRoomInfo.room_my_role == 0 ? '2px solid rgba(239, 88, 123, 1)' : '2px solid gray', borderRadius: '50%' }}></Image>
                            <Text style={{ fontSize: '24px', fontFamily: myFont, color: 'white' }}>
                                {myRoomInfo.players[0].player_state ? myRoomInfo.players[0].player_name : 'Server'}
                            </Text>
                        </View>
                        <Text style={{ fontSize: '18px', color: 'gray', fontFamily: myFont }}>  VS </Text>
                        <View style={{ display: "flex", flexDirection: 'column', justifyContent: 'center', alignItems: 'center', rowGap: '10px' }}>
                            <Image source={
                                myRoomInfo.players[1].player_state ? require("../assets/avatar/avatar_player1.png") : require("../assets/avatar/avatar_empty.png")
                            }
                                style={{ width: isPC ? '100px' : '60px', height: isPC ? '100px' : '60px', border: myRoomInfo.room_my_role == 0 ? '2px solid gray' : '2px solid rgba(239, 88, 123, 1)', borderRadius: '50%' }}></Image>
                            <Text style={{ fontSize: '24px', fontFamily: myFont, color: 'white' }}>
                                {myRoomInfo.players[1].player_state ? myRoomInfo.players[1].player_name : 'Client'}
                            </Text>
                        </View>
                    </View>

                    {myRoomInfo && myRoomInfo.room_my_role == 0 &&
                        < View style={{ display: 'flex', flexDirection: 'row', columnGap: '10px', alignItems: 'center' }}>
                            <Text style={{ fontSize: isPC ? '18px' : '12px', color: copied ? 'rgba(239, 88, 123, 0.8)' : 'rgba(239, 88, 123, 1)', fontWeight: '800', textDecoration: 'underline', textUnderlineOffset: '10px', cursor: 'pointer' }}
                                onClick={() => {
                                    copyToClipboard(myRoomInfo.room_path);
                                }}>
                                {reduceString(myRoomInfo.room_path)}
                            </Text>
                            <Image source={require("../assets/icons/copyIcon.png")}
                                style={{ width: isPC ? '20px' : '14px', height: isPC ? '20px' : '14px', cursor: 'pointer' }}
                                onClick={() => {
                                    copyToClipboard(myRoomInfo.room_path);
                                }} />

                        </View>}

                    <Text style={{
                        fontFamily: myFont,
                        fontSize: '20px',
                        padding: '10px',
                        background: 'rgba(239, 88, 123, 1)',
                        boxShadow: '0px 3px 10px red',
                        borderRadius: '20px',
                        cursor: 'pointer',
                        color: 'white',
                        margin: '20px'
                    }}
                    onClick = {() => {
                        if (myRoomInfo.room_my_role == 0) {
                            window.alert('server');
                        } else if (myRoomInfo.room_my_role == 1){
                            window.alert('client');
                        } else {
                            window.alert("Someone joined in an untracked way!");
                        }
                    }}
                    >
                        Play Mobber!
                    </Text>

                    {isMobile &&
                        <Image source={require("../assets/avatar/avatar_player4.png")}
                            style={{
                                width: '100%', height: '50%',
                                marginLeft: 'auto'
                            }}
                        />}
                </View>
            </View>

        </View >
    );
};

export default GameRoomScreen;


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