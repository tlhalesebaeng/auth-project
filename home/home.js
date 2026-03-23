import { navigate } from '../main/index.js';

const loginButton = document.getElementById('logout-btn');

logoutButton.addEventListener('click', () => {
    navigate('../landing/index.html');
});
