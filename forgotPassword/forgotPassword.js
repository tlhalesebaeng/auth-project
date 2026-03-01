const form = document.getElementById("forgotForm");
const emailInput = document.getElementById("email");

form.addEventListener("submit", function(callOfDuty){

    const email = emailInput.value.trim();
    callOfDuty.preventDefault();/*here im preventing page from reloading in backgrounf*?/
    if(email === ""){
        return;
    }
    /*dircting to the email verification message page*/
    window.location.href = "emailVerifMsg.html";
});
