import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';

const server_headers = ["No", "Server", "Information"];

const servers = [
  { id: 1, name: 'server1', info: 'created by kjs1' },
  { id: 2, name: 'server2', info: 'created by kjs2' },
  { id: 2, name: 'server2', info: 'created by kjs2' },
  { id: 2, name: 'server2', info: 'created by kjs2' },
  { id: 2, name: 'server2', info: 'created by kjs2' },

];

const ServerListDialog = ({ onClose, opened }) => {
  if (!opened) {
    return null;
  }
  const renderServerItem = ({ item }) => (
    <View style={{
      marginBottom: '20px',
      padding: '10px',
      // background : 'rgba(255,255,255,0.8)',
      flex: 1,
      flexDirection: 'row',
    }}>
      <div style={{ minWidth: '150px', textAlign: 'left', color: 'white' }}>{item.id}</div>
      <div style={{ minWidth: '150px', textAlign: 'left', color: 'white' }}>{item.name}</div>
      <div style={{ minWidth: '150px', textAlign: 'left', color: 'white' }}>{item.info}</div>
      {/* <Text>Players: {item.players}/{item.maxPlayers}</Text> */}
    </View>
  );

  const onFunc = () => {
    window.alert('clicked the finding server')    ;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Available Servers</Text>

      <View style={{ width: '80%', justifyContent: 'center', margin: 'auto', flex: 1, flexDirection: 'column' }}>

        <View style={{
          marginBottom: '40px',
          padding: '10px',

          flex: 1,
          flexDirection: 'row',
        }}>
          {server_headers.map(header => {
            return <div style={{
              minWidth: '150px',
              textAlign: 'left',
              color: 'white',
              fontSize: '20px',
              textDecoration : 'underline',
              fontWeight : '800'

            }}>{header}</div>
          })}
        </View>

        <FlatList data={servers}
          renderItem={renderServerItem}
          keyExtractor={server => server.id.toString()}>

        </FlatList>

        <View style={{ width: '100%', margin: '50px', flex: 1, flexDirection: 'row', alignItems: 'center' }}>
          <button style={{
            width: '160px',
            height: '40px',
            background: 'rgba(255,255,255,0.1)',
            color: 'white',
            fontSize: '24px',
            borderRadius: '20px',
            letterSpacing: '3px',
            cursor: 'pointer',
            margin: 'auto',

          }} onClick={onClose} > Refresh </button>
          <button style={{
            width: '160px',
            height: '40px',
            background: 'rgba(255,255,255,0.1)',
            color: 'white',
            fontSize: '24px',
            borderRadius: '20px',
            letterSpacing: '3px',
            cursor: 'pointer',
            margin: 'auto',

          }} onClick = {() => onClose(false)} > Cancel </button>
        </View>

      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    zIndex : 5000,
    padding: 20,
    borderRadius: 10,
    elevation: 5,
    position: 'absolute',
    width: '60%',
    height: '60%',
    overflowY: scroll,
    backgroundColor: 'rgba(26,26,26,1)',
    border: '2px solid white',
    left: '20%',
    right: '20%',
    top: '30%',
    bottom: '10%'
  },

  buttons: {
    background: 'red'
  },

  title: {
    marginBottom: '25px',
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    color: 'white',
    fontSize: '32px'
  },
  serverItem: {
    marginBottom: 5,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 10,
  },
});

export default ServerListDialog;
