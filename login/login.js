const errorMessage = document.getElementById('error-message');
const form = document.getElementById('login-form');
const email = document.getElementById('email');
const password = document.getElementById('password');
const rememberMe = document.getElementById('remember-me');
import { navigate } from '../main/index.js';

const loginButton = document.getElementById('login-btn');

form.addEventListener('submit', async function (event) {
    event.preventDefault();

    errorMessage.style.display = "none";

    if(!email.value || !password.value){
        errorMessage.style.display = "block";
        errorMessage.textContent = "All fields are required";
        return;
    }
    try{
        const response = await fetch('http://localhost:3000/login',{
            method: 'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body: JSON.stringify({
                email : email.value,
                password : password.value,
            })
        });
    
        const data = await response.json();
        if (data.success){
            if (rememberMe && rememberMe.checked) {
                localStorage.setItem('rememberedEmail', email.value);
                localStorage.setItem('rememberedPassword', password.value);
                localStorage.setItem('rememberMeChecked', 'true');
            } else {
                localStorage.removeItem('rememberedEmail');
                localStorage.removeItem('rememberedPassword');
                localStorage.setItem('rememberMeChecked', 'false');
            }
            
            sessionStorage.setItem('userId', data.id);
            sessionStorage.setItem('username', data.username);
            sessionStorage.setItem('userEmail', data.email);
            sessionStorage.setItem('isLoggedIn', 'true');
            alert(`${email.value} Logged in  successfully` );
            navigate('../home/home.html');
        }
        
        else{
            errorMessage.style.display = "block";
            errorMessage.textContent = data.error;
        }
    
    }
    catch(err){
            errorMessage.style.display = "block";
            errorMessage.textContent = "Server error";
            console.error("Login error:", err);

        }
});
function loadRememberedCredentials() {
    const rememberedEmail = localStorage.getItem('rememberedEmail');
    const rememberedPassword = localStorage.getItem('rememberedPassword');
    const rememberMeChecked = localStorage.getItem('rememberMeChecked');
    
    if (rememberedEmail && rememberedPassword && rememberMeChecked === 'true') {
        email.value = rememberedEmail;
        password.value = rememberedPassword;
        
        if (rememberMe) {
            rememberMe.checked = true;
        }
    }
}

document.addEventListener('DOMContentLoaded', () => {
    loadRememberedCredentials();
});

