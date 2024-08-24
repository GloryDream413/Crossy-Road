import React, { Component, useContext, useState, useEffect } from "react";
import { Image, Dimensions, Text, Alert, Animated, Easing, StyleSheet, View } from "react-native";

import GameContext from "../context/GameContext";
import { myFont } from '../global/myFont';
import { useNavigation } from "@react-navigation/native";


function GameOver({ ...props }) {
  const { gameMode, setGameMode, character } = React.useContext(GameContext);
  const navigation = useNavigation();

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

  const restartGame = () => {
    props.setGameState('none');
    // setGameMode(0);
    // navigation.navigate("GameScreen");

    // props.navigation.goBack();
    // props.onRestart();
    // props.setGameState(true);
  };

  return (
    <Animated.View style={{
      background: 'black',
      width: isPC ? '450px' : '80%',
      height: isPC ? '40%' : '40%',
      display: 'flex', flexDirection: 'column',
      justifyContent: 'center', alignItems: 'center',
      rowGap: '20px',
      paddingTop: '10px',
      paddingBottom: '10px',
      border: '3px solid gray',
      borderRadius: '20px',
    }}>
      <Text style={{
        textAlign: 'center',
        fontSize: isPC ? '50px' : '32px',
        fontWeight: '900',
        color: 'rgba(253, 198, 211, 1)',
        WebkitTextStroke: '2px rgba(239, 88, 123, 1)',
        filter: 'drop-shadow(3px 5px 8px #ff0000)',
        textShadow: '0 0 5px #fff, 0 0 10px #fff, 0 0 20px #ff00de, 0 0 30px #ff00de, 0 0 40px #ff00de'
        // ...(isMobile ? { left: '0px' } : {}), 
      }}>
        GAME OVER !
      </Text>
      <Text style={{
        textAlign: 'center',
        fontSize: isPC ? '20px' : '14px',
        fontWeight: '900',
        color: 'white',
      }}>
        You scored&nbsp;
        <Text style={{ color: 'rgba(239, 88, 123, 1)' }}>350</Text> Crash Tokens
      </Text>
      <Text style={{
        fontFamily: myFont,
        fontSize: '20px',
        padding: '10px',
        background: 'rgba(239, 88, 123, 1)',
        boxShadow: '0px 3px 10px red',
        borderRadius: '20px',
        cursor: 'pointer',
        color: 'white',
        marginTop: '30px',
        marginBottom: '10px'
      }}
        onClick={restartGame}
      >
        Play Again
      </Text>
    </Animated.View>

  );
}

export default GameOver;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "transparent",
  },
  paragraph: {
    margin: 24,
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    color: "#34495e",
  },
});
