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
import { useNavigation } from "@react-navigation/native";
import { View, Text, Image, Platform, Dimensions } from 'react-native';

// Landing Page component
const LoadingScreen = () => {

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

    // Personal variables

    return (
        <View style={{
            width: '100%',
            height: '100px',
            minHeight: '100px',
            minHeight: '100px',
            display: 'flex',
            flexDirection: 'row',
            background: 'black',
            borderBottom: '1px solid white',
            zIndex: 5000,
        }}>
            <View style={{
                width: '100px', height: '100px',
                borderRight: '1px solid white',
            }}>
                <Image source={require("../assets/crossy_logo.png")}
                    style={{
                        width: 75, height: 75,
                        margin: 'auto'
                    }}
                />
            </View>
            <View style={{
                position: 'relative',
                background: 'black',
                color: 'white',
                width: 'calc(100vw - 100px)',
                display: 'flex', flexDirection: 'row',
                justifyContent: 'end',
                alignItems: 'center',
                columnGap: '10px',
                paddingRight: '20px'
            }}>
                {isPC &&
                    <>
                        <View style={{
                            padding: '10px',
                            cursor: 'pointer'
                        }}>
                            How to Play
                        </View>
                        <View style={{
                            padding: '10px',
                            cursor: 'pointer'
                        }}>
                            Leaderboard
                        </View>
                        <View style={{
                            padding: '10px',
                            background: 'rgba(239, 88, 123, 1)',
                            boxShadow: '0px 3px 10px red',
                            borderRadius: '20px',
                            cursor: 'pointer'
                        }}>
                            New Game
                        </View>
                    </>
                }
                {isMobile && <View style={{
                    padding: '10px',
                    cursor: 'pointer'
                }}>
                    Menu
                </View>}
            </View>

        </View>
    );
};

export default LoadingScreen;

