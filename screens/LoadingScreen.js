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
import { View, Text, Image } from 'react-native';

import useResponsiveFontSize from '../mobile/useResponsiveFontSize';

// Landing Page component
const LoadingScreen = () => {

    // Initial Variables
    const navigation = useNavigation();

    // Personal variables
    const [isLoading, setIsLoading] = useState(true);
    const [loadingPercent, setLoadingPercent] = useState(1);
    const fontSize = useResponsiveFontSize('72px', '36px'); // Default and mobile sizes

    useEffect(() => {
        if (loadingPercent < 100) {
            const intervalId = setInterval(() => {
                setLoadingPercent(prev => {
                    if (prev >= 99) {
                        clearInterval(intervalId);
                        return 100;
                    }
                    return prev + 1;
                });
            }, 10);
        } else {
            setIsLoading(false);
        }
    }, [])

    return (
        <View style={{
            position: 'relative',
            display: 'flex',
            flexDirection: 'column',
            height: '100vh',
            overflow: 'hidden',
            background: 'black',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
        }}>
            <Image source={require("../assets/crossy_logo.png")}
                style={{ width: 200, height: 200 }}
            />

            <Text style={{
                position: 'absolute',
                // textAlign : 'right',
                right: '1rem',
                bottom: '1rem',
                fontSize: fontSize,
                fontWeight: '800',
                color: 'rgba(253, 198, 211, 1)',
                padding: '5px',
                WebkitTextStroke: '2px rgba(239, 88, 123, 1)',
                textShadow: `
                    0 0 5px rgba(239, 88, 123, 0.8), 
                    0 0 10px rgba(239, 88, 123, 0.5)
                `
            }}>
                {loadingPercent} %
            </Text>
        </View>
    );
};

export default LoadingScreen;

