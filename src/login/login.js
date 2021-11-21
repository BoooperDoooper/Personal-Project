const { ipcRenderer } = require('electron');
var mysql = require('mysql');
var connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root",
    database: "personal project"
});
connection.connect((err) => {
    if (err) {
        return console.log(err.stack);
    }

    console.log('Connected Succesfully Established');
});


if (navigator.onLine != true) {
    let notOnline = document.createElement('div');
    notOnline.classList.add('notOnline');
    notOnline.innerHTML = 
    `
    <button class='notOnlineBtn'><i class="fas fa-times"></i></button>
    <p>
        You are not connected to the internet!
        Please connect to a network connection to log in!
    </p>
    `;
    const body = document.querySelector('body');
    body.append(notOnline);
    document.querySelector('.notOnlineBtn').addEventListener('click', () => {
        body.removeChild(notOnline);
    });
}

const submitBtnLog = document.querySelector('.submitLog');
const submitBtnReg = document.querySelector('.submitReg');
const closeButton = document.querySelector('.close');
const minimizeButton = document.querySelector('.min');
const logBtn = document.querySelector('.logBtn');
const registerBtn = document.querySelector('.registerBtn');
const legend = document.querySelector('.legend');
const formEntryLog = document.querySelector('.formEntryLog');
const formEntryReg = document.querySelector('.formEntryReg');


logBtn.addEventListener('click', () => {
    logBtn.classList.add('activeEntry');
    registerBtn.classList.remove('activeEntry');
    formEntryLog.style.left = 50 + '%';
    formEntryReg.style.left = 150 + '%';
});
registerBtn.addEventListener('click', () => {
    registerBtn.classList.add('activeEntry');
    logBtn.classList.remove('activeEntry');
    formEntryLog.style.left = -150 + '%';
    formEntryReg.style.left = 50 + '%';
});

closeButton.addEventListener('click', () => {
    ipcRenderer.send('closeLog');
});
minimizeButton.addEventListener('click', () => {
    ipcRenderer.send('minLog');
});

if (logBtn.classList.contains('activeEntry') == true) {
    legend.innerHTML = 'Log In';
} else {
    legend.innerHTML = 'Register';
}

submitBtnLog.addEventListener('click', (e) => {
    e.preventDefault();
    async function hash(message) {
        const msgBuffer = new TextEncoder().encode(message);                    
        const hashBuffer = await crypto.subtle.digest('SHA-256', msgBuffer);
        const hashArray = Array.from(new Uint8Array(hashBuffer));
        const hashedPass = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');

        return hashedPass;
    }
    hash(document.getElementById('logPassword').value).then((result) => {
    
        var $queryString = 'SELECT * FROM `users` WHERE `user_email` LIKE "' + document.getElementById('logEmail').value + '"';
    
        connection.query($queryString, (err, rows, fields) => {
            if (err) {
                console.log('An error has occured with the query', err);
            }
            console.log(result);
            if (result == rows[0].user_password && document.getElementById('logEmail').value == rows[0].user_email) {
                ipcRenderer.send('userGotIn');           
                connection.end(() => {
                    console.log('Connection Succesfully Closed');
                })
            };
        });
    
    });
});
submitBtnReg.addEventListener('click', (e) => {
    e.preventDefault();
    async function hash(message) {
        const msgBuffer = new TextEncoder().encode(message);                    
        const hashBuffer = await crypto.subtle.digest('SHA-256', msgBuffer);
        const hashArray = Array.from(new Uint8Array(hashBuffer));
        const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');

        return hashHex;
    }

    let hashMessage = document.querySelector('.regPassword').value;
    let hashMessage2 = document.querySelector('.regConPassword').value;

    hash(hashMessage).then((result) => {
        hash(hashMessage2).then((result1) => {
            if (result === result1) {                   
                const regUsername = document.getElementById('regUsername');
                const regEmail = document.getElementById('regEmail');
                const regPassword = document.getElementById('regPassword');
                const regConPassword = document.getElementById('regConPassword');
                console.log(regEmail.value);

                var $queryString = 'SELECT * FROM `users` WHERE EXISTS (SELECT * FROM `users` WHERE `user_email` = "' + regEmail.value + '")';
            
                connection.query($queryString, (err, rows, fields) => { 
                    if (err) {
                        console.log('An error has occured with the query', err);
                    }
                    console.log(regUsername.value);
                    var $queryString = 'INSERT INTO `users`(`user_name`, `user_email`, `user_password`) VALUES ("' + regUsername.value + '", "' + regEmail.value + '", "' + regPassword.value + '");'
                    connection.query($queryString, (err, rows) => {
                        if (err) {
                            console.log('An error has occured with the query', err)
                        }
                        console.log('Success');
                    });
                });


                logBtn.classList.add('activeEntry');
                registerBtn.classList.remove('activeEntry');
                formEntryLog.style.left = 50 + '%';
                formEntryReg.style.left = 150 + '%';

                regUsername.value = '';
                regEmail.value = '';
                regPassword.value = '';
                regConPassword.value = '';

            } else {
                console.log('Not correct Matching');
            }
        })
    })
});