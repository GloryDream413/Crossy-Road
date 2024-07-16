import { createContext } from 'react';

export default createContext({
    character: 'brent', setCharacter() { }, highscore: 0, setHighscore() { },
    gameMode: 123
});
