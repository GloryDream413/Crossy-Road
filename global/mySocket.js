import io from 'socket.io-client';

export const SERVER_URL = "http://192.168.140.49:3000";
export const socket = io(SERVER_URL);