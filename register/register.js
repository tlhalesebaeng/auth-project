import { navigate } from '../main/index.js';

const RegisterButton = document.getElementById('RegisterButton');

RegisterButton.addEventListener('click', (event) => {
    event.preventDefault(); 
    navigate('../verify-email/verify-email.html');
});
