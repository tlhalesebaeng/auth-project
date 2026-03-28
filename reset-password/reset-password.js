import { navigate } from '../main/index.js';

const errorMessage = document.getElementById('error-message');
const form = document.getElementById('reset-password-form');
const newPassword = document.getElementById('new-password');
const confirmPassword = document.getElementById('confirm-password');
const token = new URLSearchParams(window.location.search).get('token');

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

    if (newPassword.value != confirmPassword.value){
        confirmPassword.classList.add("input-error");
        errorMessage.style.display = "block";
        errorMessage.textContent = "Passwords Do Not Match!";
        return;
    }

    const p = newPassword.value;
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
        const response = await fetch('http://localhost:3000/do-reset-password',{
            method: 'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body: JSON.stringify({
                token: token,
                password: newPassword.value,
                confirmPassword: confirmPassword.value
            })
        });

        const data = await response.json();
        if (data.success){
            alert(`Password reset successfully` );
            navigate('../home/home.html');
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