const ws = window.WebSocket || window.MozWebSocket;
// shortcut:
const qs = document.querySelector.bind(document);
let connection;
let username = "";

/*********************************************************/
/* 1. Setting up the web socket + socket event listeners */
/*********************************************************/
const initializeConnection = ev => {
    const url = qs('#server').value;
    connection = new ws(url);
    console.log(`Connecting to ${url}...`);

    connection.onopen = () => {
        // fires when the server message received indicating an open connection
        console.log("WebSocket connection is open.");
        utils.showLogin();
    };
    
    connection.onclose = () => {
        // fires when the server message received indicating a closed connection
        console.log("WebSocket connection is closed.");
        alert('Socket server disconnected!');
    };
    
    connection.onerror = ev => {
        // fires when the server indicates a websocket error
        console.error("WebSocket error observed:", ev);
    };
    
    // this is what you will be implementing (see below)
    connection.onmessage = handleServerMessage;
};

/********************************************************/
/* 2. Helper functions that send messages to the server */
/********************************************************/
const notify = {
    sendChat: () => {
        if (qs("#message").value !== "") {
            connection.send(JSON.stringify({
                type: "chat",
                text: qs("#message").value,
                username: username
            }));
            qs("#message").value = "";
        }
    },

    triggerFromEnter: (ev, callback) => {
        if (ev.keyCode === 13) {
            ev.preventDefault();
            callback(ev);
        }
    },

    logout: () => {
        if (!connection) {
            return;
        }
        connection.send(JSON.stringify({
            type: "disconnect",
            username: username
        }));
    },

    login: () => {
        username = qs("#name").value;
        if (!username) {
            return;
        }
        if (!connection) {
            return;
        }

        // log into server:
        connection.send(JSON.stringify({
            type: "login",
            username: username
        }));

        // update UI:
        utils.showChatInterface();
    }
}

/************************************************/
/* 3. Event handlers that listen for DOM events */
/************************************************/
qs('#connect').addEventListener('click', initializeConnection);
qs("#set-name").addEventListener("click", notify.login);
qs('#send').addEventListener('click', notify.sendChat);
qs("#server").addEventListener('keyup', ev => {
    notify.triggerFromEnter(ev, initializeConnection);
});
qs("#name").addEventListener('keyup', ev => {
    notify.triggerFromEnter(ev, notify.login);
});
qs("#message").addEventListener('keyup', ev => {
    notify.triggerFromEnter(ev, notify.sendChat);
});

// logout when the user closes the tab:
window.addEventListener('beforeunload', notify.logout);

// load with cursor on the server textbox:
qs("#server").focus();

/******************************************************/
/* 4. Helper Functions that hide and show UI elements */
/******************************************************/
const utils = {
    resetApp: () => {
        connection = null;
        utils.showElements(['#ws-status']);
        utils.hideElements(
            ['#name-display', '#chat-container', '#send-container', '#status']);
        qs("#chat").innerHTML = '';
    },

    showLogin: () => {
        utils.hideElements(['#step1']);
        utils.showElements(['#step2', '#ws-status']);
        qs("#ws-status").textContent = "Connected";
        qs("#name").focus();
    },

    showChatInterface: () => {
        qs("#name-display").textContent = `Signed in as ${username}.`;
        utils.hideElements(['#step2']);
        utils.showElements(
            ['#name-display', '#chat-container', '#send-container', '#status']);
        qs("#message").focus();
    },

    showElements: elements => {
        document.querySelectorAll(elements).forEach(elem => {
            elem.classList.remove('hidden');
        })
    },
    hideElements: elements => {
        document.querySelectorAll(elements).forEach(elem => {
            elem.classList.add('hidden');
        })
    }
};


/********************
 * 5. Your Code Here
 ********************/
const showAllUsers = (data) => {
    const activeUsersHTML = data.active_users.map(user => { return `<li id="${user}">${user}</li>`}).join("\n")
    qs("#users-list ul").innerHTML = activeUsersHTML
}

const addUser = (data) => {
    const activeUsers = data.active_users
    let userToAdd = activeUsers[activeUsers.length-1]
    if (username !== userToAdd) { userToAdd += " has" } 
    else { userToAdd = "You have" }
    
    qs("#update").innerHTML = `<div role="alert">${userToAdd} joined the chat.</div>`
}

const removeUser = (data) => {
    console.log(data)
    const userToRemove = data.user_left
    data.active_users = data.active_users.map(user => { 
        if(user !== userToRemove) { return user }
    })
    qs("#update").innerHTML = `<div role="alert">${userToRemove} has left the chat.</div>`
}

const addMessage = (data) => {
    let rightOrLeft = ""
    if (data.username === username) { rightOrLeft = `"right"><strong>You:</strong>` }
    else { rightOrLeft = `"left"><strong>${data.username}:</strong>` }
    const messageHTML = `<div role="alert"><div class=` + rightOrLeft + `<span class="sr-only">said</span> ${data.text}</div></div>`

    qs("#chat").insertAdjacentHTML("beforeend", messageHTML)
}

const handleServerMessage = ev => {
    const data = JSON.parse(ev.data);
    if (data.type === "login") {
        addUser(data)
        showAllUsers(data)
    } else if (data.type === "disconnect") {
        removeUser(data)
        showAllUsers(data)
    } else if (data.type === "chat") {
        addMessage(data)
    } else {
        console.error("Message type not recognized.");
        console.log(data);
    }
};