import React, { Component, useContext } from "react";
import { Image, Alert, Animated, Easing, StyleSheet, View } from "react-native";
import { useSafeArea } from "react-native-safe-area-context";

import Banner from "../components/GameOver/Banner";
import Footer from "../components/GameOver/Footer";
import AudioManager from "../src/AudioManager";
import Characters from "../src/Characters";
import useDimensions from "../src/hooks/useDimensions";
import Images from "../src/Images";

import GameContext from "../context/GameContext";

// import { setGameState } from '../src/actions/game';

//TODO: Make this dynamic
const banner = [
  {
    color: "#3640eb",
    title: "YOU ARE DEAD !",
    button: {
      onPress: (_) => {
        Alert.alert(
          "Subscribe to our mailing list",
          "Join our mailing list and discover the latest news from Expo and Evan Bacon.\n\n Read our privacy policy on https://github.com/EvanBacon/Expo-Crossy-Road/privacy.md",
          [
            { text: "Cancel", onPress: () => console.log("Cancel Pressed!") },
            { text: "OK", onPress: () => console.log("OK Pressed!") },
          ],
          {
            cancelable: false,
          }
        );
      },
      source: Images.button.mail,
      style: { aspectRatio: 1.85, height: 40 },
    },
  },
  {
    color: "#368FEB",
    title: "YOU LOST 1000 CASH TOKENS",
  },
  {
    color: "#36D6EB",
    title: "PAY 1000 TOKENS TO GO",
  },
];

// const AnimatedBanner = Animated.createAnimatedComponent(Banner);

function GameOver({ ...props }) {
  const { gameMode, character } = React.useContext(GameContext);

  const {
    window: { width },
  } = useDimensions();
  const [currentIndex, setCurrentIndex] = React.useState(0);
  const [characters, setCharacters] = React.useState(
    Object.keys(Characters).map((val) => Characters[val])
  );
  const [animations, setAnimations] = React.useState(
    banner.map((val) => new Animated.Value(0))
  );

  const dismiss = () => {
    // props.navigation.goBack();
    props.onRestart();
  };

  const pickRandom = () => {
    const randomIndex = Math.floor(Math.random() * (characters.length - 1));
    const randomCharacter = characters[randomIndex];
    // props.setCharacter(randomCharacter);
    dismiss();
  };

  React.useEffect(() => {
    setTimeout(() => {
      _animateBanners();

      const playBannerSound = async () => {
        await AudioManager.playAsync(AudioManager.sounds.banner);
        // const soundObject = new Audio.Sound();
        // try {
        //   await soundObject.loadAsync(AudioFiles.banner);
        //   await soundObject.playAsync();
        // } catch (error) {
        //   console.warn('sound error', { error });
        // }
      };
      playBannerSound();
      setTimeout(() => playBannerSound(), 300);
      setTimeout(() => playBannerSound(), 600);
    }, 600);
  });

  const _animateBanners = () => {
    const _animations = animations.map((animation) =>
      Animated.timing(animation, {
        useNativeDriver: true,
        toValue: 1,
        duration: 1000,
        easing: Easing.elastic(),
      })
    );
    Animated.stagger(300, _animations).start();
  };

  const _showResult = (result) => {
    // if (result.action === Share.sharedAction) {
    //   if (result.activityType) {
    //     this.setState({result: 'shared with an activityType: ' + result.activityType});
    //   } else {
    //     this.setState({result: 'shared'});
    //   }
    // } else if (result.action === Share.dismissedAction) {
    //   this.setState({result: 'dismissed'});
    // }
  };

  const select = () => {
    // props.setCharacter(characters[currentIndex]);
    dismiss();
  };

  const { top, bottom, left, right } = useSafeArea();

  const imageStyle = { width: 60, height: 48 };

  // styles.container,
  return (

    <View
      style={[
        { top: "30%", left: "2.5%", right: "2.5%" }

        // props.style,
        // , gameMode > 0 && { width: "45%" }
      ]}
    >
      <View key="content" style={[{ flex: 1, justifyContent: "center" }

      ]}>
        {banner.map((val, index) => (

          <Banner
            animatedValue={animations[index].interpolate({
              inputRange: [0.2, 1],
              outputRange: [-width, 0],
              extrapolate: "clamp",
            })}
            key={index}
            style={{
              backgroundColor: val.color,
              minWidth: "100%",
              width: '100%',
              transform: [
                {
                  scaleY: animations[index].interpolate({
                    inputRange: [0, 0.2],
                    outputRange: [0, 1],
                    extrapolate: "clamp",
                  }),
                },
              ],
            }}
            title={val.title}
            button={val.button}
          />

        ))}

        {/* <View style={{
          minWidth: "100%",
          width: '100%',
        }}>
          <Image
            source={require("../assets/images/game_over.png")}
          />
        </View> */}
      </View>



      
      <Footer
        style={{ paddingLeft: left || 4, paddingRight: right || 4 }}
        showSettings={props.showSettings}
        setGameState={props.setGameState}
        navigation={props.navigation}
      />
    </View>
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
