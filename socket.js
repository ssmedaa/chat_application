const users = [];

const onSocket = (io) => {
    io.on("connection", (socket) => {

        //when user joins the function calls when event happens 
        socket.on("user:join", (name) => {
            // display new user joining room 
            io.emit("global:message", `${name} joined. `);
        });

        //sends message to all connected clients , except any new user joining
        socket.on("message:send", (payload) => {
            socket.broadcast.emit("message:receive", payload);
        });


        //user exit and will display message 
        socket.on("disconnect", () => {
            const user = users.filter((user) => user.sockeId === socket.id);

            io.emit("global:message", `${user[0].name} left. `);
        });
    });
};

export default onSocket;