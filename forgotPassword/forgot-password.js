import { navigate } from '../main/index.js';

const errorMessage = document.getElementById('errorMsg');
const form = document.getElementById('forgotForm');
const emailInput = document.getElementById('email');
const loginLink = document.querySelector('.redirect-text a');
const button = form.querySelector('button');

errorMessage.style.display = "none";
//reused this from register code
function isValidEmail(email){
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

form.addEventListener('submit', async (event) => {
    event.preventDefault();
    errorMessage.style.display = "none";

    const emailValue = emailInput.value.trim().toLowerCase();

    if (!emailValue){
        errorMessage.textContent = "Email cannot be empty!";
        errorMessage.style.display = "block";
        return;
    }

    if (!isValidEmail(emailValue)){
        errorMessage.textContent = "Please enter a valid email!";
        errorMessage.style.display = "block";
        return;
    }
    //i disabled button during sending process
    button.textContent = "Sending...";
    button.disabled = true;

    try{
        const response = await fetch('http://localhost:3000/forgot-password', {
            method: 'POST',
            headers: { 'Content-Type':'application/json' },
            body: JSON.stringify({ email: emailValue })
        });

        const data = await response.json();
        //if email validation is successful
        if (response.ok){
            navigate('../forgot/go-to-email.html');
        } else {
            errorMessage.textContent = data.error || data.message || "Something went wrong!";
            errorMessage.style.display = "block";
            button.textContent = "Submit";
            button.disabled = false;
        }
    } catch(err){
        errorMessage.textContent = "Network error. Please try again.";
        errorMessage.style.display = "block";
        button.textContent = "Submit";
        button.disabled = false;
    }
});

loginLink.addEventListener('click', (e) => {
    e.preventDefault();
    navigate('../login/login.html');
});
