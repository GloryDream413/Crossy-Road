import React, { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import GameContext from "./GameContext";
import { keyMap_None } from "../global/keyMap";
import { Animated, View, Image, Dimensions } from "react-native";

const STORAGE_KEY = "@BouncyBrent:Character";
const SHOULD_REHYDRATE = true;

const defaultState = { character: "brent", highscore: 0 };

async function cacheAsync(value) {
  await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(value));
}

async function rehydrateAsync() {
  if (!SHOULD_REHYDRATE || !AsyncStorage) {
    return defaultState;
  }
  try {
    const item = await AsyncStorage.getItem(STORAGE_KEY);
    const data = JSON.parse(item);
    return data;
  } catch (ignored) {
    return defaultState;
  }
}

export default function GameProvider({ children }) {
  const [character, setCharacter] = React.useState(defaultState.character);
  const [highscore, setHighscore] = React.useState(defaultState.highscore);
  const [gameMode, setGameMode] = React.useState(0); // 0 : PVE , 1 : PVP  
  const [contextGameMap, setContextGameMap] = React.useState([]);
  const [role, setRole] = React.useState("");
  const [keyMap_Server, setKeyMap_Server] = React.useState(keyMap_None);
  const [keyMap_Client, setKeyMap_Client] = React.useState(keyMap_None);
  const [socket, setSocket] = React.useState();

  /* ================================ For Mobile Responsive ===============================*/

  const [evalWidth, setEvalWidth] = useState(768);
  const [isMobile, setIsMobile] = useState(Dimensions.get('window').width < evalWidth);
  const [isPC, setIsPC] = useState(Dimensions.get('window').width >= evalWidth);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(Dimensions.get('window').width < evalWidth);
      setIsPC(Dimensions.get('window').width >= evalWidth);
    };
    const subscription = Dimensions.addEventListener('change', handleResize);
    return () => {
      subscription?.remove(); // Clean up the listener
    };
  }, []);

  /* ================================ For Mobile Responsive ===============================*/

  const [rotateValue, setRotateValue] = useState(0);
  const [loadingState, setLoadingState] = useState(false);

  const startAnimation = () => {
    const intervalId = setInterval(() => {
      setRotateValue(prev => {
        return (prev + 1) % 360;
      });
    }, 5);

    return () => clearInterval(intervalId);
  };

  useEffect(() => {
    if (loadingState) {
      startAnimation(); // Start the animation when the component mounts
    }
  }, [loadingState]);

  React.useEffect(() => {
    const parseModulesAsync = async () => {
      try {
        const { character, highscore, gameMode, contextGameMap, role, keyMap_Server, keyMap_Client } = await rehydrateAsync();
        setCharacter(character);
        setHighscore(highscore);
        setGameMode(gameMode);
        setContextGameMap(contextGameMap);
        setRole(role);
        setKeyMap_Server(keyMap_Server);
        setKeyMap_Client(keyMap_Client);
      } catch (ignored) { }
    };

    parseModulesAsync();
  }, []);

  return (
    <GameContext.Provider
      value={{
        loadingState, 
        setLoadingState,
        character,
        setCharacter: (character) => {
          setCharacter(character);
          cacheAsync({ character, highscore, gameMode, contextGameMap, role, keyMap_Server, setKeyMap_Server, keyMap_Client, setKeyMap_Client });
        },
        highscore,
        setHighscore: (highscore) => {
          setHighscore(highscore);
          cacheAsync({ character, highscore, gameMode, contextGameMap, role, keyMap_Server, setKeyMap_Server, keyMap_Client, setKeyMap_Client });
        },
        gameMode,
        setGameMode: (_gameMode) => {
          setGameMode(_gameMode);
          cacheAsync({ character, highscore, gameMode, contextGameMap, role, keyMap_Server, setKeyMap_Server, keyMap_Client, setKeyMap_Client });
        },
        contextGameMap,
        setContextGameMap: (_newMap) => {
          setContextGameMap(_newMap);
          cacheAsync({ character, highscore, gameMode, contextGameMap, role, keyMap_Server, setKeyMap_Server, keyMap_Client, setKeyMap_Client });
        },
        role,
        setRole: (_role) => {
          setRole(_role);
          cacheAsync({ character, highscore, gameMode, contextGameMap, role, keyMap_Server, setKeyMap_Server, keyMap_Client, setKeyMap_Client });
        },
        keyMap_Server,
        setKeyMap_Server: (_newKeyMap) => {
          setKeyMap_Server(_newKeyMap);
          cacheAsync({ character, highscore, gameMode, contextGameMap, role, keyMap_Server, setKeyMap_Server, keyMap_Client, setKeyMap_Client });
        },
        keyMap_Client,
        setKeyMap_Client: (_newKeyMap) => {
          setKeyMap_Client(_newKeyMap);
          cacheAsync({ character, highscore, gameMode, contextGameMap, role, keyMap_Server, setKeyMap_Server, keyMap_Client, setKeyMap_Client });
        },
        socket,
        setSocket: (_socket) => {
          setSocket(_socket);
          cacheAsync({ character, highscore, gameMode, contextGameMap, role, keyMap_Server, setKeyMap_Server, keyMap_Client, setKeyMap_Client });
        }
      }}
    >
      {loadingState == true &&
        <View
          style={{
            zIndex: 5000,
            position: 'absolute',
            width: '100%',
            height: '100%',
            justifyContent: "center",
            alignItems: "center",
            background: 'rgba(0,0,0,0.7)'
          }}>
          <Image
            source={require("../assets/crossy_logo.png")}
            style={{
              width: isPC ? 200 : 100,

              height: isPC ? 200 : 100,
              borderRadius: 100,
              borderWidth: 4,
              borderColor: 'gray',
              transform: `rotateY(${rotateValue}deg)`,
            }}
          />
        </View>
      }
      {children}
    </GameContext.Provider>
  );
}