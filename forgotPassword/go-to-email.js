import { navigate } from '../main/index.js';

const loginLink = document.getElementById('login-link');

loginLink.addEventListener('click', (e) => {
    e.preventDefault();
    navigate('../login/login.html'); 
});
