const { ipcRenderer } = require('electron');

const submitBtn = document.querySelector('.submitLog');
const closeButton = document.querySelector('.close');
const minimizeButton = document.querySelector('.min');
const logBtn = document.querySelector('.logBtn');
const registerBtn = document.querySelector('.registerBtn');
const legend = document.querySelector('.legend');

logBtn.addEventListener('click', () => {
    logBtn.classList.add('activeEntry');
    registerBtn.classList.remove('activeEntry');
});
registerBtn.addEventListener('click', () => {
    registerBtn.classList.add('activeEntry');
    logBtn.classList.remove('activeEntry');
});

closeButton.addEventListener('click', () => {
    ipcRenderer.send('closeLog');
});
minimizeButton.addEventListener('click', () => {
    ipcRenderer.send('minLog');
});

submitBtn.addEventListener('click', (e) => {
    e.preventDefault();
});

if (logBtn.classList.contains('activeEntry') == true) {
    legend.innerHTML = 'Log In';
} else {
    legend.innerHTML = 'Register';
}