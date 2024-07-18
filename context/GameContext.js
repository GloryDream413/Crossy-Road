import { createContext } from 'react';
// import { keyMap_1 } from '../global/keyMap';

export default createContext({
    character: 'brent', setCharacter() { }, highscore: 0, setHighscore() { },
    gameMode: 1,
    contextGameMap : [],
    setContextGameMap() {},
    role : 'KJSKJSKJS',
    setRole() {},
    keyMap_Server : [],
    setKeyMap_Server() {},
    keyMap_Client : [],
    setKeyMap_Client() {},
    socket : undefined,
    setSocket() {}
});
