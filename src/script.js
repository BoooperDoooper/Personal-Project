const { ipcRenderer } = require('electron');

// Close app
const minimizer = document.querySelector('.minimizer');
const minimize = document.querySelector('.minimize');
const closeApp = document.getElementById('close');
const bringDown = document.getElementById('minimize');
const smallerWindow = document.getElementById('smallerWindow');



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
const button = document.getElementById('button');
const sortBtn = document.querySelector('.sortBtn');
const sortAllBtn = document.querySelector('.sortAllBtn');
const addToFavorite = document.getElementById('addToFavorite');
const addNewElement = document.querySelector('.addButton');
const eyeDisplay = document.querySelector('.eyeDisplay');
const eyeDisplayC = document.querySelector('.eyeDisplayC');


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



button.addEventListener('click', () => { 
    document.querySelector('.inputTitle').focus();
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
    
    let hashMessage = document.querySelector('.pass').value;
    let hashMessage2 = document.querySelector('.confirmPass').value;

    hash(hashMessage).then((result) => {
        hash(hashMessage2).then((result1) => {
            if (result === result1) {
                let name = document.getElementById('inputName').value;
                
                const fav = document.getElementById('favList');
                const all = document.getElementById('allList');
                let newPass = document.createElement('li');
                newPass.innerHTML = `
                <h5>${name}</h5>
                <div class="expandPassLine"></div>
                <div class="expandPass">Click to view</div>
                `;
                if (addToFavorite.classList.contains('fas')) {
                    let tempPass = document.createElement('li');
                    tempPass.innerHTML = `
                    <h5>${name}</h5>
                    <div class="expandPassLine"></div>
                    <div class="expandPass">Click to view</div>
                    `;
                    fav.appendChild(newPass);
                    all.appendChild(tempPass);
                } else {
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
                document.querySelector('.unMatching').style.display = 'none';
            }
            unmatchingPass()
            return;
        })
    })
});

const fav = document.getElementById('favList');
const all = document.getElementById('allList');


function unmatchingPass() {
    if (1 ==1) {
        let notMatching = document.createElement('div');
        notMatching.classList.add('unMatching');
        notMatching.innerHTML = "Passwords aren't matching!";
        document.querySelector('.notMatching').appendChild(notMatching);
    }
}


    





// User profile sliding 

const tabLook = document.querySelector('.tabLook');
const mainSection = document.querySelector('.mainSection');
const userBlock = document.querySelector('.userBlock');


tabLook.addEventListener('click', () => {
    userBlock.classList.toggle('userSlide');
});


const proInfo = document.getElementById('proInfo');

proInfo.addEventListener('click', () => {
    ipcRenderer.send('openProInfo')
}) ;
    








// User profile script






const h1 = document.querySelector('.hh1');


let userName = 'Guillaume Latreille'

h1.innerHTML = `${userName}`;