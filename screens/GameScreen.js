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
import React, { Component, useState, useEffect, useContext } from "react";
import { GLView } from "expo-gl";
import { Animated, Dimensions, StyleSheet, Platform, Vibration, View, useColorScheme, } from "react-native";

// Personal informations MBC-
import GestureRecognizer, { swipeDirections } from "../components/GestureView";
import ScorePad from "../components/GameScorePad";
import Engine from "../src/GameEngine";
import State from "../src/state";
import GameOverScreen from "./GameOverScreen";
import HomeScreen from "./HomeScreen";
import SettingsScreen from "./SettingsScreen";
import GameContext from "../context/GameContext";
import { useNavigation } from "@react-navigation/native";

// Global variables : MBC-on mobile responsive
import { keyMap_None, keyMap_1, keyMap_2, keyMap_Both } from "../global/keyMap";
import { globalMap } from "../global/globalMap";
import HeaderScreen from "./HeaderScreen";

const DEBUG_CAMERA_CONTROLS = false;
class Game extends Component {

  constructor(props) {
    super(props);

    this.gameMode = props.gameMode;
    this.newGlobalMap = props.newGlobalMap;
    this.keyMap = props.keyMap;
    this.character = props.character;
    this.isDarkMode = props.isDarkMode;
  }

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
    // Previous commented code and it MBC-
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
        this.engine.setupGame(this.gameMode, this.props.character, this.newGlobalMap);
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

  // This is the part for starting the game
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

          // GAME-START PART !!!

          // Coming straight from the menu.
          // this.engine._hero.stopIdle();
          // this.onSwipe(swipeDirections.SWIPE_UP);
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
    // Previous Code MBC-
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
    this.engine.setupGame(this.gameMode, this.props.character, this.newGlobalMap);
    this.engine.init();
  }

  newScore = () => {
    // Vibration.cancel();
    // this.props.setGameState(State.Game.playing);
    this.setState({ score: 0 });
    this.engine.init();
  };

  onSwipe = (gestureName) => this.engine.moveWithDirection(gestureName);

  renderGame = () => {
    if (!this.state.ready) return;

    return (
      <GestureView
        pointerEvents={DEBUG_CAMERA_CONTROLS ? "none" : undefined}
        onStartGesture={this.engine.beginMoveWithDirection}
        keyMap={this.keyMap}
        gameMode={this.gameMode}
        globalMap={this.globalMap}
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
      <View style={[
        StyleSheet.absoluteFill,
        {
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          position: 'absolute',
          zIndex: '5000'
        }]}>
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
    const { isPaused } = this.props;

    return (
      <View
        pointerEvents="box-none"
        style={[
          {
            width: this.gameMode > 0 ? '50%' : '100%',
            height: 'calc(100vh - 100px)',
          },
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
          {this.renderGame()}
        </Animated.View>

        <ScorePad
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

  const { socket, role } = useContext(GameContext);

  const config = {
    velocityThreshold: 0.2,
    directionalOffsetThreshold: 80,
  };

  React.useEffect(() => {
    // window.alert('asdf' + role);
  }, []);


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
      socket={socket}
      role={role}
      {...props}
    />
  );
};

function GameScreen(props) {
  const scheme = useColorScheme();
  const navigation = useNavigation();

  const { gameMode, socket, character, contextGameMap, role, setRole } = React.useContext(GameContext);

  const server_keyMaps = [keyMap_1, keyMap_None];
  const client_keyMaps = [keyMap_None, keyMap_2];


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

  const handleSocketEndGame = (data) => {
    if (data.cmd == "END_GAME") {
      navigation.navigate("LandingScreen");
    }
  }

  socket.on('ROOM', handleSocketEndGame);

  const gotoMenu = () => {
    if (gameMode == 2) {

      socket.emit('message', JSON.stringify({
        cmd: 'END_GAME',
      }));
    } else {
      navigation.navigate("LandingScreen");
    }
  };

  return (
    <>
      {gameMode == 2 &&
        <button
          style={{
            position: 'absolute',
            borderRadius: '50px',
            padding: '10px 20px',
            background: role === 'server' ? 'linear-gradient(45deg, #9C27B0, #673AB7)' : 'linear-gradient(45deg, #000, #000)',
            border: '2px solid #333',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
            zIndex: 2000,
            right: '300px',
            top: '30px',
            cursor: 'pointer',
            fontSize: '24px',
            color: '#fff',
            fontWeight: 'bold',
            textTransform: 'uppercase',
            letterSpacing: '1px',
            transition: 'background 0.3s, transform 0.2s',
          }}
        >
          {role}
        </button>
      }
      {/* <button
        style={{
          position: 'absolute',
          borderRadius: '50px',
          padding: '10px 20px',
          background: 'linear-gradient(45deg, #4CAF50, #2196F3)',
          border: '2px solid #333',
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
          zIndex: 2000,
          right: '30px',
          top: '30px',
          cursor: 'pointer',
          fontSize: '24px',
          color: '#fff',
          fontWeight: 'bold',
          textTransform: 'uppercase',
          letterSpacing: '1px',
          transition: 'background 0.3s, transform 0.2s',
        }}
        onClick={gotoMenu}
      >
        Back to Menu
      </button> */}

      {/* Multi players via network */}
      {gameMode == 0 &&
        <View style={{ display: 'flex', flexDirection: 'column' }}>
          <HeaderScreen></HeaderScreen>
          <View style={{
            width: '100%',
            height: 'calc(100vh-100px)',
            display: 'flex'
          }}>

            <Game {...props}
              gameMode={gameMode}
              newGlobalMap={globalMap}
              keyMap={keyMap_Both}
              character={character} isDarkMode={scheme === "dark"} />
          </View>
        </View>

      }


      {gameMode == 2 && (
        <div style={{ flex: 1, flexDirection: 'row' }}>
          <div style={{ position: 'absolute', left: '0px', width: '50%', height: '100%', flex: 1 }}>
            <Game {...props}
              gameMode={gameMode}
              newGlobalMap={contextGameMap}
              keyMap={role == 'server' ? server_keyMaps[0] : client_keyMaps[0]}
              character={character}
              isDarkMode={scheme === "dark"} />
          </div>

          <div style={{ position: 'absolute', right: '0px', width: '50%', flex: 1 }}>
            <Game {...props}
              gameMode={gameMode}
              newGlobalMap={contextGameMap}
              keyMap={role == 'server' ? server_keyMaps[1] : client_keyMaps[1]}
              character={character}
              isDarkMode={scheme === "dark"} />
          </div>
        </div>
      )
      }

    </>
  );
}

export default GameScreen;
