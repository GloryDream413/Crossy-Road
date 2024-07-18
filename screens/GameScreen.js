import { GLView } from "expo-gl";
import React, { Component } from "react";
import {
  Animated,
  Dimensions,
  StyleSheet,
  Platform,
  Vibration,
  View,
  useColorScheme,
} from "react-native";

import GestureRecognizer, { swipeDirections } from "../components/GestureView";
import Score from "../components/ScoreText";
import Engine from "../src/GameEngine";
import State from "../src/state";
import GameOverScreen from "./GameOverScreen";
import HomeScreen from "./HomeScreen";
import SettingsScreen from "./SettingsScreen";
import GameContext from "../context/GameContext";

import { keyMap_1, keyMap_2, keyMap_Both } from "../global/keyMap";
import { globalMap } from "../global/globalMap";

import { useNavigation } from "@react-navigation/native";

const DEBUG_CAMERA_CONTROLS = false;
class Game extends Component {

  /// Reserve State for UI related updates...
  state = {
    ready: false,
    score: 0,
    viewKey: 0,
    gameState: State.Game.none,
    showSettings: false,
    // gameState: State.Game.gameOver
  };

  transitionScreensValue = new Animated.Value(1);

  UNSAFE_componentWillReceiveProps(nextProps, nextState) {

    if (nextState.gameState && nextState.gameState !== this.state.gameState) {
      this.updateWithGameState(nextState.gameState, this.state.gameState);
    }
    if (this.engine && nextProps.character !== this.props.character) {
      this.engine._hero.setCharacter(nextProps.character);
    }
    // if ((this.state.gameState === State.Game.playing || this.state.gameState === State.Game.paused) && nextProps.isPaused !== this.props.isPaused) {
    //   this.setState({ gameState: nextProps.isPaused ? State.Game.paused : State.Game.playing })
    // }
    // if (nextProps.character.id !== this.props.character.id) {
    //   (async () => {
    //     this.world.remove(this._hero);
    //     this._hero = this.hero.getNode(nextProps.character.id);
    //     this.world.add(this._hero);
    //     this._hero.position.set(0, groundLevel, startingRow);
    //     this._hero.scale.set(1, 1, 1);
    //     this.init();
    //   })();
    // }
  }

  transitionToGamePlayingState = () => {
    Animated.timing(this.transitionScreensValue, {
      toValue: 0,
      useNativeDriver: true,
      duration: 200,
      onComplete: ({ finished }) => {
        this.engine.setupGame(this.props.character, globalMap);
        this.engine.init();

        if (finished) {
          Animated.timing(this.transitionScreensValue, {
            toValue: 1,
            useNativeDriver: true,
            duration: 300,
          }).start();
        }
      },
    }).start();
  };

  updateWithGameState = (gameState) => {
    if (!gameState) throw new Error("gameState cannot be undefined");

    if (gameState === this.state.gameState) {
      return;
    }
    const lastState = this.state.gameState;

    this.setState({ gameState });
    this.engine.gameState = gameState;
    const { playing, gameOver, paused, none } = State.Game;
    switch (gameState) {
      case playing:
        if (lastState === paused) {
          this.engine.unpause();
        } else if (lastState !== none) {
          this.transitionToGamePlayingState();
        } else {
          // Coming straight from the menu.
          this.engine._hero.stopIdle();
          this.onSwipe(swipeDirections.SWIPE_UP);
        }

        break;
      case gameOver:
        break;
      case paused:
        this.engine.pause();
        break;
      case none:
        if (lastState === gameOver) {
          this.transitionToGamePlayingState();
        }
        this.newScore();

        break;
      default:
        break;
    }
  };

  componentWillUnmount() {
    cancelAnimationFrame(this.engine.raf);
  }

  async componentDidMount() {
    // AudioManager.sounds.bg_music.setVolumeAsync(0.05);
    // await AudioManager.playAsync(
    //   AudioManager.sounds.bg_music, true
    // );

    Dimensions.addEventListener("change", this.onScreenResize);
  }

  onScreenResize = ({ window }) => {
    this.engine.updateScale();
  };

  componentWillUnmount() {
    Dimensions.removeEventListener("change", this.onScreenResize);
  }

  UNSAFE_componentWillMount() {
    this.engine = new Engine();
    // this.engine.hideShadows = this.hideShadows;
    this.engine.onUpdateScore = (position) => {
      if (this.state.score < position) {
        this.setState({ score: position });
      }
    };
    this.engine.onGameInit = () => {
      this.setState({ score: 0 });
    };
    this.engine._isGameStateEnded = () => {
      return this.state.gameState !== State.Game.playing;
    };
    this.engine.onGameReady = () => this.setState({ ready: true });
    this.engine.onGameEnded = () => {
      this.setState({ gameState: State.Game.gameOver });
      // this.props.navigation.navigate('GameOver')
    };
    this.engine.setupGame(this.props.character, globalMap);
    this.engine.init();
  }

  newScore = () => {
    Vibration.cancel();
    // this.props.setGameState(State.Game.playing);
    this.setState({ score: 0 });
    this.engine.init();
  };

  onSwipe = (gestureName) => this.engine.moveWithDirection(gestureName);

  renderGame = (keyMap, globalMap) => {
    if (!this.state.ready) return;

    return (
      <GestureView
        pointerEvents={DEBUG_CAMERA_CONTROLS ? "none" : undefined}
        onStartGesture={this.engine.beginMoveWithDirection}
        keyMap={keyMap}
        globalMap={globalMap}
        onSwipe={this.onSwipe}
      >
        <GLView
          style={{ flex: 1, height: "100%", overflow: "hidden" }}
          onContextCreate={this.engine._onGLContextCreate}
        />
      </GestureView>
    );
  };

  renderGameOver = () => {
    if (this.state.gameState !== State.Game.gameOver) {
      return null;
    }

    return (
      <View style={StyleSheet.absoluteFillObject}>
        <GameOverScreen
          showSettings={() => {
            this.setState({ showSettings: true });
          }}
          setGameState={(state) => {
            this.updateWithGameState(state);
          }}
        />
      </View>
    );
  };

  renderHomeScreen = () => {
    if (this.state.gameState !== State.Game.none) {
      return null;
    }

    return (
      <View >
        <HomeScreen
          onPlay={() => {
            this.updateWithGameState(State.Game.playing);
          }}
        />
      </View>
    );
  };

  renderSettingsScreen() {
    return (
      <View style={StyleSheet.absoluteFillObject}>
        <SettingsScreen goBack={() => this.setState({ showSettings: false })} />
      </View>
    );
  }

  render() {
    const { keyMap, globalMap, isDarkMode, isPaused } = this.props;

    return (
      <View
        pointerEvents="box-none"
        style={[
          // StyleSheet.absoluteFill,
          { flex: 1, backgroundColor: "#0f0f0f", padding: '20px', width: '100%', height: '100%' },
          Platform.select({
            web: { position: "fixed" },
            default: { position: "absolute" },
          }),
          this.props.style,
        ]}
      >
        <Animated.View
          style={{ flex: 1, opacity: this.transitionScreensValue }}
        >
          {this.renderGame(keyMap, globalMap)}
        </Animated.View>

        <Score
          score={this.state.score}
          gameOver={this.state.gameState === State.Game.gameOver}
        />

        {this.renderGameOver()}

        {this.renderHomeScreen()}

        {/* {this.state.showSettings && this.renderSettingsScreen()} */}

        {isPaused && (
          <View
            style={[
              StyleSheet.absoluteFill,
              {
                backgroundColor: "rgba(105, 201, 230, 0.8)",
                justifyContent: "center",
                alignItems: "center",
              },
            ]}
          />
        )}

      </View>
    );
  }
}

const GestureView = ({ onStartGesture, onSwipe, ...props }) => {
  const config = {
    velocityThreshold: 0.2,
    directionalOffsetThreshold: 80,
  };

  return (
    <GestureRecognizer
      onResponderGrant={() => {
        onStartGesture();
      }}
      onSwipe={(direction) => {
        onSwipe(direction);
      }}
      config={config}
      onTap={() => {
        onSwipe(swipeDirections.SWIPE_UP);
      }}
      style={{ flex: 1 }}
      {...props}
    />
  );
};

function GameScreen(props) {
  const scheme = useColorScheme();
  const { character , contextGameMap} = React.useContext(GameContext);

  const gameMode = props.gameMode;

  const navigation = useNavigation();

  const gotoMenu = () => {
    navigation.navigate("LandingScreen");
  };

  // const appState = useAppState();

  return (
    <>
      <button
        style={{
          position: 'absolute',
          borderRadius: '40px',
          padding: '10px',
          background: 'rgba(255,255,255,0.5)',
          border: '2px solid black',
          zIndex: 2000,
          right: '30px',
          top: '30px',
          cursor: 'pointer',
          fontSize : '32px',
          padding : '15px',
        }}
        onClick={gotoMenu}
      >Back to Menu</button>
      {gameMode == 0 ? (
        <Game {...props}  globalMap={globalMap} keyMap={keyMap_Both} character={character} isDarkMode={scheme === "dark"} />
      ) : ( gameMode == 1 ? (
        <div style={{ flex: 1, flexDirection: 'row' }}>
          <div style={{ position: 'absolute', left: '0px', width: '50%', flex: 1 }}>
            <Game {...props}
              globalMap={globalMap} keyMap={keyMap_1} character={character} isDarkMode={scheme === "dark"} />
          </div>
          <div style={{ position: 'absolute', right: '0px', width: '50%', flex: 1 }}>
            <Game {...props}
              globalMap={globalMap} keyMap={keyMap_2} character={character} isDarkMode={scheme === "dark"} />
          </div>
        </div>
      ) : (
        <div style={{ flex: 1, flexDirection: 'row' }}>
        <div style={{ position: 'absolute', left: '0px', width: '50%', flex: 1 }}>
          <Game {...props}
            globalMap={contextGameMap} keyMap={keyMap_1} character={character} isDarkMode={scheme === "dark"} />
        </div>
        <div style={{ position: 'absolute', right: '0px', width: '50%', flex: 1 }}>
          <Game {...props}
            globalMap={contextGameMap} keyMap={keyMap_2} character={character} isDarkMode={scheme === "dark"} />
        </div>
      </div>
      ))}
    </>
  );
}

export default GameScreen;
