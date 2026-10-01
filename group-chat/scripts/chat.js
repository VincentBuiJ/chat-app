// const socket = io();

// const form = document.getElementById('form');
// const input = document.getElementById('input');
// const chat = document.getElementById('chat');
// form.addEventListener('submit', submitEvent);
// function submitEvent(event){
//     event.preventDefault();
//     if (input.value) {
//        socket.emit('chat message', input.value);
//        input.value = '';
//     }
// }
// socket.on('chat message', appendMessage);
// function appendMessage(message){
//  var Words = document.getElementById("words");
//             var Who = document.getElementById("who");
//             var Input = document.getElementById("input");
//             var Talk1 = document.getElementById("talk1");
            
                
//                 if(Who.value == 0){
	                
//                     str = '<div class="atalk"><span>A says :' + message +'</span></div>';
//                 }
//                 else{
//                     str = '<div class="btalk"><span>B says :' + message +'</span></div>' ;  
//                 }
//                 Words.innerHTML = Words.innerHTML + str;

// }



const socket = io();

const form = document.getElementById('form');
const input = document.getElementById('input');

let myRole = null;


// Server tells this browser whether it is A or B
socket.on('your role', function(role) {
    myRole = role;

    console.log("I am " + myRole);
});


form.addEventListener('submit', submitEvent);

function submitEvent(event) {
    event.preventDefault();

    if (input.value && myRole) {

        socket.emit('chat message', {
            message: input.value,
            sender: myRole
        });

        input.value = '';
    }
}


socket.on('chat message', appendMessage);


function appendMessage(data) {

    const Words = document.getElementById("words");

    let str;

    if (data.sender === "A") {
        str = '<div class="atalk"><span>A says: ' +
              data.message +
              '</span></div>';
    }
    else if (data.sender === "B") {
        str = '<div class="btalk"><span>B says: ' +
              data.message +
              '</span></div>';
    }

    Words.innerHTML += str;
}

