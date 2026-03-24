const User = require('../common/models/User');
const bcryptjs = require('bcryptjs');

async function hashPassword(password){
    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(password,salt);

    return hashedPassword;
}

exports.doRegister = async (req,res) =>{
    try{
        const username = req.body.firstName + " " + req.body.lastName;
        const email = req.body.email;
        const password = req.body.password;
        const confirmPassword = req.body.confirmPassword;

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

