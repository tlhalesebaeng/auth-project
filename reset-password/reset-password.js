import { navigate } from '../main/index.js';

const resetPasswordButton = document.getElementById('reset-password-btn');

resetPasswordButton.addEventListener('click', (event) => {
    event.preventDefault();
    navigate('../home/home.html');
});
