const User = require('../common/models/User');
const bcryptjs = require('bcryptjs');


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

async function hashPassword(password){
    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(password,salt);

    return hashedPassword;
}

exports.doRegister = async (req,res) =>{
    try{
        const username = req.body.username;
        const password = req.body.password;
        const confirmPassword = req.body.confirmPassword;
        const email = req.body.email;
        const userExists = await User.findOne({email :req.body.email});
        if (userExists){
            return res.status(409).json({error:"User Already Exists!"});
        }

        if (username === "" || email === "" || password === "" || confirmPassword === ""){
            return res.status(400).json({error:"Please Fill All The Required Fields!"});
        }
        
        if (password !== confirmPassword){
            return res.status(400).json({error: "Passwords do not match"});
        }

        if (password.length < 8){
            return res.status(400).json({error : "Password length must be at least 8 characters long"});
        }

        if (!isStrong(password)){
            return res.status(400).json({error: "Password is too weak. It must include at least one uppercase letter, one lowercase letter, one digit and one special symbol {'!','@','#','$','%','&','*'}"});
        }



        const hashedPassword = await hashPassword(password);

        const user = await User.create({
            username,
            email,
            password : hashedPassword
        });

        res.status(201).json({
            success: true,
            user : {id: user._id, username: user.username, email:user.email}
        });
    }catch(err){
        console.log(err);
        res.status(500).json({
            success: false,
            error: err.message
        });
    }
};

exports.login = async (req, res)=>{
    try{
        const email = req.body.email;
        const password = req.body.password;

        const user = await User.findOne({email: email.toLowerCase()});

        if(!user){
            return res.status(404).json({error: "User not found"});
        }

        const isMatching = await user.comparePassword(password);
        
        if(!isMatching){
            return res.status(400).json({error: "Invalid credentials!"})
        }
        res.status(200).json({success: "User Logged in"});
    }
    catch(err){
        console.log(err);
        res.status(500).json({
            success: false,
            error: err.message
        });
    }
}

