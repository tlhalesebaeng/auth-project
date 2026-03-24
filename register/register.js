const errorMessage = document.getElementById('error-message');
const form = document.getElementById('registration-form');
const firstName = document.getElementById('firstName');
const lastName = document.getElementById('lastName');
const email = document.getElementById('email');
const confirmPassword = document.getElementById('confirm-password');
const password = document.getElementById('new-password');
import { navigate } from '../main/index.js';

errorMessage.style.display = "none";


form.addEventListener('submit', async (event)=>{
    event.preventDefault();

    errorMessage.style.display = "none";
    confirmPassword.classList.remove("input-error");

    if (password.value != confirmPassword.value){
        confirmPassword.classList.add("input-error");
        errorMessage.style.display = "block";
        errorMessage.textContent = "Passwords Do Not Match!";
        return;
    }

    try{
        const response = await fetch('http://localhost:3000/do-register',{
            method: 'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body: JSON.stringify({
                firstName : firstName.value,
                lastName: lastName.value,
                email : email.value,
                password : password.value,
                confirmPassword: confirmPassword.value
            })
        });

        const data = await response.json();
        if (data.success){
            alert(`${firstName.value} registered successfully` );
            navigate('../login/login.html');
        }
        else{
            errorMessage.style.display = "block";
            errorMessage.textContent = data.error;
        }

    }catch(err){
        errorMessage.style.display = "block";
        errorMessage.textContent = err.message;
    }
})