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

// Personal informations
import GameContext from '../context/GameContext';
import ServerListDialog from './ServerListDialog';
import { globalMap } from "../global/globalMap";
import { keyMap_1, keyMap_2, keyMap_Both, keyMap_None } from "../global/keyMap";
import JoiningDialog from './JoiningDialog';

// Global variables : MBC-on mobile responsive
export const SERVER_URL = "http://localhost:2024";
export const socket = io(SERVER_URL);

// Landing Page component
const LandingScreen = () => {

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
    }, []);

    // Personal variables
    const [userName, setUserName] = useState("");
    const [openRoom, setOpenRoom] = useState(false);

    // For the landing page GUI
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

    return (
        <div style={{
            position: 'relative',
            height: '100vh',
            overflow: 'hidden',
            background: 'black',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
        }}>
            <JoiningDialog
                opened={openRoom}
                onClose={setOpenRoom}
            />
            {/* <ServerListDialog
                opened={open}
                onClose={setOpen}
                socket={socket}
            /> */}

            {createStars()}

            <div style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                margin: 'auto',
            }}>

                <div>
                    <h1 className='title'>The Road to Valhalla!</h1>
                </div>
                <div style={{
                    background: 'rgba(0,0,255,0.4)',
                    borderRadius: '1rem',
                    padding: '1rem',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center'
                }}>
                    <img src={require("../assets/avatar/crossy_avatar.jpg")}
                        style={{ borderRadius: '50%', margin: '1rem', boxShadow: '10px 10px 10px rgba(255,0,0,0.4)' }}></img>
                    <div style={{
                        display: "flex",
                        flexDirection: 'row',
                        color: 'white',
                        fontSize: '1rem',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        margin: '1rem',
                        height: '2.5rem'
                    }}>
                        <input style={{ padding: '0.5rem', flex: 1, border: '1px solid #ccc', borderRadius: '5px', backgroundColor: '#f5f5f5', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)', outline: 'none', fontSize: '1rem', color: '#333', transition: 'box-shadow 0.3s, border-color 0.3s', lineHeight: '1.5' }}
                            type="text" placeholder="Enter your name"
                            value={userName}
                            onChange={(e) => {
                                setUserName(e.target.value);
                            }}
                            autoFocus />
                    </div>

                    <button className="decoration-button" onClick={() => {
                        if (userName !== "") {
                            setGameMode(0);
                            navigation.navigate("GameScreen");
                        }
                    }} >Play !</button>
                    <button className="decoration-button" onClick={() => {
                        setOpenRoom(true);
                    }}>Create Private Room</button>
                </div>


            </div>
        </div>
    );
};

export default LandingScreen;


// CSS styles for drawing the stars actively moving everywhere.
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
        
    @keyframes spin {
        from {
            transform: rotate(0deg);
        }
        to {
            transform: rotate(360deg);
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
        border-radius : 1rem;
        color: white;
        margin : 1rem;
        margin-top : 0.75rem;
        margin-bottom : 0.75rem;
        letter-spacing : 2px;
        border: 2px solid white;
        font-size: 16px;
        cursor: pointer;
        transition: all 0.3s;
        height : 3rem;
    }

    .decoration-button:hover {
        background-color: rgba(0,0,255,0.2);
        color : white;
        border : 2px solid green;
        transition : 1s all;
        transform : scale(1.1);
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
