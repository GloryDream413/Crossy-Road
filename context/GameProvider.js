import AsyncStorage from "@react-native-async-storage/async-storage";
import * as React from "react";

import GameContext from "./GameContext";

import { CrossyGameMap } from "../src/CrossyGame";

import { keyMap_1, keyMap_2, keyMap_Both, keyMap_None } from "../global/keyMap";
// import AsyncStorage from '@react-native-community/async-storage';

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

  React.useEffect(() => {
    const parseModulesAsync = async () => {
      try {
        const { character, highscore , gameMode, contextGameMap, role, keyMap_Server, keyMap_Client} = await rehydrateAsync();
        setCharacter(character);
        setHighscore(highscore);
        setGameMode(gameMode);
        setContextGameMap(contextGameMap);
        setRole(role);
        setKeyMap_Server(keyMap_Server);
        setKeyMap_Client(keyMap_Client);

      } catch (ignored) { }
      //   setLoaded(true);
    };

    parseModulesAsync();
  }, []);

  return (
    <GameContext.Provider
      value={{
        character,
        setCharacter: (character) => {
          setCharacter(character);
          cacheAsync({ character, highscore, gameMode, contextGameMap, role , keyMap_Server, setKeyMap_Server, keyMap_Client, setKeyMap_Client});
        },
        highscore,
        setHighscore: (highscore) => {
          setHighscore(highscore);
          cacheAsync({ character, highscore, gameMode, contextGameMap, role , keyMap_Server, setKeyMap_Server, keyMap_Client, setKeyMap_Client});
        },
        gameMode,
        setGameMode: (_gameMode) => {
          setGameMode(_gameMode);
          cacheAsync({ character, highscore, gameMode, contextGameMap, role , keyMap_Server, setKeyMap_Server, keyMap_Client, setKeyMap_Client});
        },
        contextGameMap,
        setContextGameMap: (_newMap) => {
          setContextGameMap(_newMap);
          cacheAsync({ character, highscore, gameMode, contextGameMap, role , keyMap_Server, setKeyMap_Server, keyMap_Client, setKeyMap_Client});
        },
        role,
        setRole: (_role) => {
          setRole(_role);
          cacheAsync({ character, highscore, gameMode, contextGameMap, role , keyMap_Server, setKeyMap_Server, keyMap_Client, setKeyMap_Client});
        },
        keyMap_Server, 
        setKeyMap_Server : (_newKeyMap) => {
          setKeyMap_Server(_newKeyMap);
          cacheAsync({ character, highscore, gameMode, contextGameMap, role , keyMap_Server, setKeyMap_Server, keyMap_Client, setKeyMap_Client});
        },
        keyMap_Client,
        setKeyMap_Client : (_newKeyMap) => {
          setKeyMap_Client(_newKeyMap),
          cacheAsync({ character, highscore, gameMode, contextGameMap, role , keyMap_Server, setKeyMap_Server, keyMap_Client, setKeyMap_Client});
        }
      }}
    >
      {children}
    </GameContext.Provider>
  );
}
