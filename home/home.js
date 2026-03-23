import { navigate } from '../main/index.js';

const logoutButton = document.getElementById('logout-btn');

logoutButton.addEventListener('click', () => {
    navigate('../landing/index.html');
});
