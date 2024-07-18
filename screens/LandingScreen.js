import React, { useEffect, useState } from 'react';
import { useNavigation } from "@react-navigation/native";
import GameContext from '../context/GameContext';
import ServerListDialog from './ServerListDialog';
import { globalMap } from "../global/globalMap";
import { keyMap_1, keyMap_2, keyMap_Both, keyMap_None } from "../global/keyMap";

import io from 'socket.io-client';

const SERVER_URL = "http://192.168.140.49:3000";
const socket = io(SERVER_URL);

const status_room = 0; // Room is not created yet.

const LandingScreen = () => {
    const [flag, setFlag] = useState(status_room); // Created the server or not

    const [open, setOpen] = useState(false);            //  showing the find server dlg or not

    const navigation = useNavigation();
    const { gameMode, setGameMode,
        keyMap_Server, setKeyMap_Server,
        role, setRole,
        contextGameMap, setContextGameMap } = React.useContext(GameContext);
    const [roomName, setRoomName] = useState("");

    const closeServers = () => {
        setFlag(0);
    }

    useEffect(() => {
        setFlag(status_room);
    }, []);

    useEffect(() => {
        const handleSocketMessage = (data) => {
            if (data.cmd === "ROOM_CREATED") {
                setRoomName(data.name);
                setFlag(1);
            } else if (data.cmd === "ROOM_CLOSED") {
                setFlag(0);
            }
        };

        const handleSocketRoom = (data) => {
            if (data.cmd == "GOT_JOINED_TO_SERVER") {

                // Client joined to this server....
                // window.alert(roomName);

                // if (roomName == data.roomName) 
                    {
                    console.log("kjs:",data);

                    // Set the Network-Game mode.
    
                    setGameMode(2);
                    setKeyMap_Server(keyMap_1);
                    setContextGameMap(data.globalMap);
                    setRole('server');
    
                    // window.alert('server');
    
                    start_game();
                }

            }
        }

        socket.on('ROOM', handleSocketRoom);
        socket.on('message', handleSocketMessage);

        return () => {
            socket.off('message', handleSocketMessage);
            socket.off('ROOM', handleSocketRoom);
        };
    }, []);

    const start_game = () => {


        console.log("@@@@@@@@@@@@@@@@@@@@@@ starting game :", role, keyMap_Server);

        // START THE GAME AS PLAYER=======1
        navigation.navigate("GameScreen_2");
    }

    const createStars = () => {
        const stars = [];
        for (let i = 0; i < 200; i++) {
            stars.push(
                <div
                    key={i}
                    className="star"
                    style={{
                        top: `${-Math.random() * 200}vh`,
                        left: `${-Math.random() * 200}vw`,
                        animationDelay: `${Math.random() * 1}s`
                    }}
                ></div>
            );
        }
        return stars;
    };

    const handleOnePlayerLocal = () => {
        navigation.navigate("GameScreen");
        setGameMode(0);
    };

    const handleTwoPlayersLocal = () => {
        navigation.navigate("GameScreen_1");
        setGameMode(1);
    };

    const handleCreateRoom = () => {
        socket.emit('message', JSON.stringify({
            cmd: 'CREATE_ROOM',
            map: globalMap
        }));
    };

    const handleCloseRoom = () => {
        socket.emit('message', JSON.stringify({
            cmd: 'CLOSE_ROOM',
            name: roomName,
            map: 'I will set it after!'
        }));
    };

    const handleFindServers = () => {
        setOpen(true);
    }

    return (
        <div className="landing-screen" style={{
            position: 'relative',
            overflow: 'hidden',
            height: '100vh',
            background: 'black'
        }}>
            <ServerListDialog
                opened={open}
                onClose={setOpen}
                socket={socket}
            />
            {createStars()}

            <div style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                height: '100%',
            }}>
                <h1 className="title">The Road to Valhalla!</h1>

                <button className="decoration-button" onClick={handleOnePlayerLocal}>SINGLE PLAYER</button>
                <button className="decoration-button" onClick={handleTwoPlayersLocal}>MULTI PLAYERS</button>

                {flag === 0 ? (
                    <button className="decoration-button" onClick={handleCreateRoom}>CREATE SERVER</button>
                ) : (
                    <button className="decoration-button" style={{ background: 'rgba(255, 0, 0, 0.4)' }} onClick={handleCloseRoom}>CLOSE ROOM</button>
                )}

                <button className="decoration-button" onClick={handleFindServers}>FIND SERVERS</button>
            </div>
        </div>
    );
};

export default LandingScreen;


// CSS styles
const styles = `
    .star {
        position: absolute;
        background-color: white;
        border-radius: 50%;
        width: 2px;
        height: 2px;
        animation: starAnimation 5s linear infinite;
    }

    @keyframes starAnimation {
        0% {
            transform: translate(0, 0) scale(1);
            opacity: 1;
        }
        100% {
            transform: translate(150vw, 150vh) scale(0.9);
            opacity: 1;
        }
    }

    .title {
        color : white;
        font-size : 60px;
        margin-bottom : 80px;
        transition : all 2s;
        transform : scale(1);
        cursor : pointer;
    }
    
    .title:hover{
        transition : all 2s;
        transform : scale(1.2);
        cursor : pointer;
    }

    .decoration-button {
        background-color: transparent;
        border-radius : 20px;
        color: white;
        margin : 20px;
        letter-spacing : 2px;
        border: 2px solid white;
        padding: 10px 20px;
        font-size: 16px;
        cursor: pointer;
        transition: all 0.3s;
        width : 300px;
        height : 75px;
    }

    .decoration-button:hover {
        background-color: rgba(255,255,255,0.1);
        color : white;
        border : 2px solid green;
        transition : 1s all;
        transform : scale(1.25);
    }

    @keyframes glow {
        0% {
            text-shadow: 0 0 10px #fff, 0 0 20px #fff, 0 0 30px #ff00de, 0 0 40px #ff00de, 0 0 50px #ff00de, 0 0 60px #ff00de, 0 0 70px #ff00de;
        }
        100% {
            text-shadow: 0 0 10px #fff, 0 0 20px #fff, 0 0 30px #ff00de, 0 0 40px #ff00de, 0 0 50px #ff00de, 0 0 60px #ff00de, 0 0 70px #ff00de, 0 0 80px #ff00de;
        }
    }

    h1 {
        color: white;
        font-size: 40px;
        animation: glow 1s infinite alternate;
    }


`;

const styleSheet = document.createElement('style');
styleSheet.type = 'text/css';
styleSheet.innerText = styles;
document.head.appendChild(styleSheet);
