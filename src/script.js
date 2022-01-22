const { ipcRenderer, BrowserWindowProxy } = require('electron');
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

let userEmail;
let userName;

// function getInformation() {
//     var $queryString = 'SELECT * FROM `users` WHERE `user_email` LIKE "' + JSON.parse(localStorage.getItem('email')) + '"';
    
//     connection.query($queryString, (err, rows, fields) => {
//         if (err) {
//             console.log('An error has occured with the query', err);
//         }
//         localStorage.clear();
//         console.log(rows[0])
//         // userEmail = rows[0].user_email;
//         // userName = rows[0].user_name;
//         connection.end(() => {
//             console.log('Connection Succesfully Closed');
//         });
//     });
// }
// getInformation();
console.log(userName, 'and', userEmail)


// Close app
const minimizer = document.querySelector('.minimizer');
const minimize = document.querySelector('.minimize');
const closeApp = document.getElementById('close');
const bringDown = document.getElementById('minimize');
const smallerWindow = document.getElementById('smallerWindow');

// ipcRenderer.on('profileInfo', function (userName, userEmail, userPass) {
//     console.log(userName, userEmail, userPass);
// });


// if (navigator.onLine == true) {
//     console.log('User is online');
// }

closeApp.addEventListener('click', () => {
    ipcRenderer.send('closeApp');
});
bringDown.addEventListener('click', () => {
    ipcRenderer.send('bringDown');
});
smallerWindow.addEventListener('click', () => {
    ipcRenderer.send('resize');
});
    
function loadFile(event) {
	var image1 = document.getElementById('output');
	image1.src = URL.createObjectURL(event.target.files[0]);
};
// minimizer.addEventListener('click', () => {
//     minimize.classList.toggle('fa-expand');
//     minimize.classList.toggle('fa-compress');
// });



const passList = document.querySelector('.passList');
const favPassAdd = document.getElementById('favPassAdd');
const sortBtn = document.querySelector('.sortBtn');
const sortAllBtn = document.querySelector('.sortAllBtn');
const addToFavorite = document.getElementById('addToFavorite');
const addNewElement = document.querySelector('.addButton');
const eyeDisplay = document.querySelector('.eyeDisplay');
const eyeDisplayC = document.querySelector('.eyeDisplayC');


// passList.forEach(pass, () => {
//     console.log(pass.className);
// });


const changeFontColor = document.getElementById('changeFontColor');

changeFontColor.addEventListener('input', () => {
    // console.log('black is better', changeFontColor.value);
    var rootVariable = document.querySelector(':root');
    rootVariable.style.setProperty('--main-font-color', changeFontColor.value);
});





eyeDisplay.addEventListener('click', () => {
    let pass = document.querySelector('.pass');
    const type = pass.getAttribute('type') === 'password' ? 'text' : 'password';
    pass.setAttribute('type', type);
    eyeDisplay.classList.toggle('fa-eye');
    eyeDisplay.classList.toggle('fa-eye-slash');
});
eyeDisplayC.addEventListener('click', () => {
    let confirmPass = document.querySelector('.confirmPass');
    const type = confirmPass.getAttribute('type') === 'password' ? 'text' : 'password';
    confirmPass.setAttribute('type', type);
    eyeDisplayC.classList.toggle('fa-eye');
    eyeDisplayC.classList.toggle('fa-eye-slash');
});

addToFavorite.addEventListener('click', () => {
    addToFavorite.classList.toggle('far');
    addToFavorite.classList.toggle('fas');
});

sortBtn.addEventListener('click', () => {
    const favPasses = document.querySelector('.favPasses');
    favPasses.classList.toggle('favPassesToggle');
    if (favPasses.classList.contains('favPassesToggle')) {
        sortBtn.style.transform = 'rotate(90deg)';
    } else {
        sortBtn.style.transform = 'rotate(0deg)';
    }
});
sortAllBtn.addEventListener('click', () => {
    const allPasses = document.querySelector('.allPasses');
    allPasses.classList.toggle('allPassesToggle');
    if (allPasses.classList.contains('allPassesToggle')) {
        sortAllBtn.style.transform = 'rotate(90deg)';
    } else {
        sortAllBtn.style.transform = 'rotate(0deg)';
    }
});





const form = document.querySelector('form');
form.addEventListener('submit', () => {
        
    async function hash(message) {
                        const msgBuffer = new TextEncoder().encode(message);                    
                        const hashBuffer = await crypto.subtle.digest('SHA-256', msgBuffer);
                        const hashArray = Array.from(new Uint8Array(hashBuffer));
                        const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
                
                        return hashHex;
                    }
    if (document.querySelector('.addTitle').innerText === 'Website') {
        let hashMessage = document.querySelector('.pass').value;
        let hashMessage2 = document.querySelector('.confirmPass').value;

        hash(hashMessage).then((result) => {
            hash(hashMessage2).then((result1) => {
                if (result === result1) {
                    
                    let yourName = document.getElementById('inputName').value;
                    
                    const fav = document.getElementById('favList');
                    const all = document.getElementById('allList');

                    let newPass = document.createElement('li');
                    newPass.innerHTML = `
                    <h5>${yourName}</h5>
                    <div class="expandPassLine"></div>
                    <div class="expandPass">Click to view</div>
                    `;
                    if (addToFavorite.classList.contains('fas')) {
                        let tempPass = document.createElement('li');
                        tempPass.innerHTML = `
                        <h5>${yourName}</h5>
                        <div class="expandPassLine"></div>
                        <div class="expandPass">Click to view</div>
                        `;
                        newPass.classList.add(`${yourName}`);
                        tempPass.classList.add(`${yourName}`);
                        fav.appendChild(newPass);
                        all.appendChild(tempPass);
                    } else {
                        newPass.classList.add(`${yourName}`);
                        // console.log(newPass.className);
                        all.appendChild(newPass);
                    }
                    if (addToFavorite.classList.contains('fas')) {
                        addToFavorite.classList.toggle('far');
                        addToFavorite.classList.toggle('fas');
                    }
                    document.querySelector('.name').value = '';
                    document.querySelector('.user').value = '';
                    document.querySelector('.email').value = '';
                    document.querySelector('.pass').value = '';
                    document.querySelector('.confirmPass').value = '';

                    let notMatching = document.querySelector('.unMatching');
                    notMatching.parentNode.removeChild(notMatching);
                } else {
                    unmatchingPass();
                }
                return;
            })
        });
    } else {
        let yourName = document.getElementById('inputName').value;
        
        const fav = document.getElementById('favList');
        const all = document.getElementById('allList');

        let newPass = document.createElement('li');
        newPass.innerHTML = `
        <h5>${yourName}</h5>
        <div class="expandPassLine"></div>
        <div class="expandPass">Click to view</div>
        `;
        if (addToFavorite.classList.contains('fas')) {
            let tempPass = document.createElement('li');
            tempPass.innerHTML = `
            <h5>${yourName}</h5>
            <div class="expandPassLine"></div>
            <div class="expandPass">Click to view</div>
            `;
            newPass.classList.add(`${yourName}`);
            tempPass.classList.add(`${yourName}`);
            fav.appendChild(newPass);
            all.appendChild(tempPass);
        } else {
            newPass.classList.add(`${yourName}`);
            console.log(newPass.className);
            all.appendChild(newPass);
        }
        if (addToFavorite.classList.contains('fas')) {
            addToFavorite.classList.toggle('far');
            addToFavorite.classList.toggle('fas');
        }
        document.querySelector('.name').value = '';
        document.querySelector('.user').value = '';
        document.querySelector('.email').value = '';
        document.querySelector('.pass').value = '';
        document.querySelector('.confirmPass').value = '';
        return;
    }
});

const fav = document.getElementById('favList');
const all = document.getElementById('allList');

function unmatchingPass() {
    if (document.querySelector('.unMatching') == null) {
        let notMatching = document.createElement('div');
        notMatching.classList.add('unMatching');
        notMatching.innerHTML = "Passwords aren't matching!";
        document.querySelector('.notMatching').appendChild(notMatching);
    }
}


// User profile sliding 

const settings = document.querySelector('.settings');
const closeProfile = document.querySelector('.closeProfile');
const openProfile = document.querySelector('.openProfile');
const mainSection = document.querySelector('.mainSection');
const signOut = document.getElementById('signOut');

closeProfile.addEventListener('click', () => {
    settings.classList.remove('userActive');
});

openProfile.addEventListener('click', () => {
    settings.classList.add('userActive');
});

// signOut.addEventListener('click', () => {
//     ipcRenderer.send('userSignOut');
// });

const proInfo = document.getElementById('proInfo');

// proInfo.addEventListener('click', () => {
//     ipcRenderer.send('openProInfo');
// }) ;

const addTitle = document.querySelector('.addTitle');
const dropDownEl1 = document.querySelector('.dropDownEl1');    
const dropDownEl2 = document.querySelector('.dropDownEl2');    


dropDownEl1.addEventListener('click', () => {
    addTitle.innerHTML = dropDownEl1.innerHTML;
    document.getElementsByName('name')[0].placeholder = 'Website Name*';
    document.getElementsByName('name')[0].value = '';
    document.getElementsByName('name')[0].required = true;
    document.getElementsByName('user')[0].placeholder = 'UserName';
    document.getElementsByName('user')[0].value = '';
    document.getElementsByName('user')[0].required = false;
    document.getElementsByName('email')[0].placeholder = 'Email';
    document.getElementsByName('email')[0].value = '';
    document.getElementsByName('email')[0].type = 'email';
    document.getElementsByName('email')[0].required = false;
    document.getElementsByName('pass')[0].placeholder = 'Password*';
    document.getElementsByName('pass')[0].value = '';
    document.getElementsByName('pass')[0].type = 'text';
    document.getElementsByName('pass')[0].required = true;
    document.getElementsByName('confirmPass')[0].placeholder = 'Confirm Password*';
    document.getElementsByName('confirmPass')[0].value = '';
    document.getElementsByName('confirmPass')[0].required = true;
    document.getElementsByName('confirmPass')[0].type = 'password';
    document.getElementsByName('eyeDisplay')[0].style.display = 'block';
    document.getElementsByName('eyeDisplay')[0].style.pointerEvents = 'all';
    document.getElementsByName('eyeDisplay')[0].classList.toggle('fa-eye-splash');
    document.getElementsByName('eyeDisplayC')[0].classList.toggle('fa-eye-splash');
    document.getElementsByName('eyeDisplayC')[0].style.display = 'block';
    document.getElementsByName('eyeDisplayC')[0].style.pointerEvents = 'all';
});
dropDownEl2.addEventListener('click', () => {
    addTitle.innerHTML = dropDownEl2.innerHTML;
    document.getElementsByName('name')[0].placeholder = 'Card/Store Name*';
    document.getElementsByName('name')[0].value = '';
    document.getElementsByName('name')[0].required = true;
    document.getElementsByName('user')[0].placeholder = 'Name Indicated on Card';
    document.getElementsByName('user')[0].value = '';
    document.getElementsByName('user')[0].required = false;
    document.getElementsByName('email')[0].placeholder = 'Card Number*';
    document.getElementsByName('email')[0].value = '';
    document.getElementsByName('email')[0].type = 'text';
    document.getElementsByName('email')[0].required = true;
    document.getElementsByName('pass')[0].type = 'date';
    document.getElementsByName('pass')[0].placeholder = '';
    document.getElementsByName('pass')[0].value = '';
    document.getElementsByName('pass')[0].required = false;
    document.getElementsByName('confirmPass')[0].placeholder = 'CVV';
    document.getElementsByName('confirmPass')[0].value = '';
    document.getElementsByName('confirmPass')[0].required = false;
    document.getElementsByName('confirmPass')[0].type = 'text';
    document.getElementsByName('eyeDisplay')[0].style.display = 'hidden';
    document.getElementsByName('eyeDisplay')[0].style.pointerEvents = 'none';
    document.getElementsByName('eyeDisplayC')[0].style.display = 'hidden';
    document.getElementsByName('eyeDisplayC')[0].style.pointerEvents = 'none';
    document.getElementsByName('eyeDisplay')[0].classList.toggle('fa-eye-splash');
    document.getElementsByName('eyeDisplayC')[0].classList.toggle('fa-eye-splash');
});




// const randomBg = document.querySelector('.randomBackground');
// randomBg.addEventListener('click', () => {
//     let rand = 'https://source.unsplash.com/random/1600x1000'
//     document.querySelector('body').style.backgroundImage = "url('"+ rand +"')";
// });






// const saveInfo = document.querySelector('.saveInfo');

// saveInfo.addEventListener('click', () => {
//     var connection = mysql.createConnection({
//         host: "localhost",
//         user: "root",
//         password: "root",
//         database: "personal project"
//     });
//     connection.connect((err) => {
//         if (err) {
//             return console.log(err.stack);
//         }
    
//         console.log('Connected Succesfully Established');
//     });
    
//     var $queryString = 'SELECT * FROM `users` WHERE `user_name` LIKE `Aiméric`';
    
//     connection.query($queryString, (err, rows, fields) => {
//         if (err) {
//             console.log('An error has occured with the query', err);
//         }
//         rows[0].user_name = document.querySelector('.accountName');
//     });

// });