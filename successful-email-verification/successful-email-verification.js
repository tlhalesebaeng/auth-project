import { navigate } from '../main/index.js';

const element = document.getElementById('redirection-timer');

setTimeout(() => {
    navigate('../home/home.html');
}, 5000);

let count = 5;
setInterval(() => {
    element.innerHTML = count--;
}, 1000);