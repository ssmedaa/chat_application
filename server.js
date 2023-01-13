import express from "express";
import onSocket from "./socket.js";
import { Server } from "socket.io";
import { createServer } from "http";
import { dirname } from 'path';
import { fileURLToPath } from "url";



const __filename = fileURLToPath(
    import.meta.url);
const __dirname = dirname(__filename);


const app = express();
const server = createServer(app);

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/public/index.html");
});

app.use(express.static(__dirname + "/public"));
const io = new Server(server);
onSocket(io); //socket.js

const port = process.env.PORT || 4000; //webserver port declared to 4000 host
server.listen(port, () => console.log(`Lisening on ${port}....`));