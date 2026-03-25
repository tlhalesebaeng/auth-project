const errorMessage = document.getElementById('error-message');
const form = document.getElementById('registration-form');
const username = document.getElementById('username');
const email = document.getElementById('email');
const confirmPassword = document.getElementById('confirm-password');
const password = document.getElementById('new-password');
import { navigate } from '../main/index.js';

errorMessage.style.display = "none";

function isStrong(password){
    let hasLowercase = false;
    let hasUppercase = false;
    let hasDigit = false;
    let SpecialSymbols = ['!','@','#','$','%','&','*'];
    let HasSpecialSymbols = false;

    for (let x of password){
        if (x >= 'A' && x <= 'Z'){
            hasUppercase = true;
        }
        else if(x >= 'a' && x <= 'z'){
            hasLowercase = true;
        }
        else if (x >='0' && x <= '9'){
            hasDigit = true;
        }
        else if (SpecialSymbols.includes(x)){
            HasSpecialSymbols = true;
        }
    }

    return hasLowercase && hasUppercase && hasDigit && HasSpecialSymbols;
    
}

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

    const p = password.value;
    if (p.length < 8){
        errorMessage.style.display = "block";
        errorMessage.textContent = "Password must be at least 8 characters long!";
        return;
    }

    if (!isStrong(p)){
        errorMessage.style.display = "block";
        errorMessage.textContent = "Password is too weak. It must include at least one uppercase letter, one lowercase letter, one digit and one special symbol {'!','@','#','$','%','&','*'}";
        return;
    }


    try{
        const response = await fetch('http://localhost:3000/do-register',{
            method: 'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body: JSON.stringify({
                username: username.value,
                email : email.value,
                password : password.value,
                confirmPassword: confirmPassword.value
            })
        });

        const data = await response.json();
        if (data.success){
            alert(`${username.value} registered successfully` );
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