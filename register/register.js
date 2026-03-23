import { navigate } from '../main/index.js';

const registerButton = document.getElementById('register-btn');

registerButton.addEventListener('click', (event) => {
    event.preventDefault(); 
    navigate('../verify-email/verify-email.html');
});
