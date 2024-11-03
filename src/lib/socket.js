import { io } from "socket.io-client";

const PORT = 3001 || process.env.SERVER_PORT
const socket = io(`http://localhost:${PORT}`)

export default socket;