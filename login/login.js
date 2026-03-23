import { navigate } from '../main/index.js';

const loginButton = document.getElementById('login-btn');

loginButton.addEventListener('click', (event) => {
    event.preventDefault();
    navigate('../home/home.html');
});
