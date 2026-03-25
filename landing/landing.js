import { navigate } from '../main/index.js';

const loginButton = document.getElementById('login-btn');
const registerButton = document.getElementById('register-btn');

loginButton.addEventListener('click', () => {
    navigate('../login/login.html');
});

registerButton.addEventListener('click', () => {
    navigate('../register/register.html');
});
