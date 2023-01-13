const socket = io();

const messages = document.getElementById("messages");
const form = document.getElementById("box");
const input = document.getElementById("input");

const userName = prompt("Enter Your Name Please.");
socket.emit("user:join", userName);



socket.on("global:message", (message) => {
    //writing in html doc
    messages.innerHTML += `
    <p class="join_message" >${message}</p>
    `;
});
//client 
socket.on("message:receive", (payload) => {
    messages.innerHTML += `          
    <div class="receive_chatbox" >
        <p class="receiver_name" >${payload.name}</p>
        <p class="sent_message" >${payload.message}</p>
    </div>
    `;
});

form.addEventListener("submit", (e) => {
    //stop the default action 
    e.preventDefault();
    messages.innerHTML += `          
    <div class="sent_chatbox" >
        <p class="your_name" >You</p>
        <p class="sent_message" >${input.value}</p>
    </div>
    `;
    socket.emit("message:send", { name: userName, message: input.value });
    input.value = "";
});