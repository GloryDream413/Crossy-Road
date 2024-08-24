import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, Platform, View, Dimensions, Image } from 'react-native';
import { useSafeArea } from 'react-native-safe-area-context';
import GameContext from '../context/GameContext';
import { myFont } from '../global/myFont';

function generateTextShadow(width) {
  return Platform.select({
    web: {
      textShadow: `-${width}px 0px 0px #000, ${width}px 0px 0px #000, 0px -${width}px 0px #000, 0px ${width}px 0px #000`
    }, default: {}
  });
}
const textShadow = generateTextShadow(4);
const textShadowHighscore = generateTextShadow(2);

export default function ScorePad({ gameOver, score, ...props }) {
  const { highscore = 0, setHighscore } = React.useContext(GameContext);

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

  React.useEffect(() => {
    if (gameOver) {
      if (score > highscore) {
        setHighscore(score);
      }
    }
  }, [gameOver])


  const { top, left } = useSafeArea();

  return (
    <View style={{
      position: 'absolute', left: '0px', bottom: '0px', background: 'black', zIndex: '5000',
      width: isPC ? '300px' : '250px', height: isPC ? '150px' : '125px',
      display: 'flex', flexDirection: 'row',
      borderTopRightRadius: '50px', border: '2px solid gray',
    }}>
      <View style={{
        width: '50%', display: 'flex', flexDirection: 'column', borderRight: '2px solid gray',
        alignItems: 'center',
        textAlign: 'center',
        rowGap: '10px',
        justifyContent: 'center'
      }}>
        <Text style={{
          color: 'white',
          fontSize: isPC ? '50px' : '30px',
          fontWeight: '900',
          letterSpacing: '2px',
          fontFamily: myFont,
          color: 'rgba(253, 198, 211, 1)',
          WebkitTextStroke: '2px rgba(239, 88, 123, 1)',
          filter: 'drop-shadow(3px 5px 8px #ff0000)',
          textShadow: '0 0 5px #fff, 0 0 10px #fff, 0 0 20px #ff00de, 0 0 30px #ff00de, 0 0 40px #ff00de'

        }}>{score}</Text>
        <Text style={{
          fontSize: isPC ? '20px' : '14px',
          fontFamily: myFont,
          color: 'white',

        }}>Top {score}</Text>
      </View>
      <View style={{
        width: '50%', alignItems: 'center',
        display: 'flex', flexDirection: 'row',
        columnGap: '10px', justifyContent: 'center',
      }}>
        <Image source={require("../assets/images/ScoreCoin.png")}
          style={{ width: '30%', height: '50%' }}
        />
        <Text style={{ color: 'yellow', fontSize: isPC ? '24px' : '16px', fontFamily: myFont }}>x 21</Text>
      </View>
    </View >
    // <View pointerEvents="none" style={[styles.container, { top: Math.max(top, 16), left: Math.max(left, 8) }]}>
    //   <Text style={[styles.score, textShadow]}>{score}</Text>
    //   {highscore > 0 && (<Text style={[styles.highscore, textShadowHighscore]}>TOP {highscore}</Text>)}
    // </View>
  )
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
  },

  score: {
    color: 'white',
    fontFamily: 'retro',
    fontSize: 48,
    backgroundColor: 'transparent',
  },
  highscore: {
    color: 'yellow',
    fontFamily: 'retro',
    fontSize: 14,
    marginTop: 4,
    letterSpacing: -0.1,
    backgroundColor: 'transparent',
  }
})