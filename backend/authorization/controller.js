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

exports.doResetPassword = async (req, res) => {
    try {
        const token = req.body.token;
        const password = req.body.password;
        const confirmPassword = req.body.confirmPassword;

    //password validation
    if (password !== confirmPassword){
        return res.status(400).json({error: "Passwords do not match"});
    }

    if (password.length < 8){
        return res.status(400).json({error: "Password length must be at least 8 characters long"});
    }

    if (!isStrong(password)){
        return res.status(400).json({error: "Password is too weak. It must include at least one uppercase letter, one lowercase letter, one digit and one special symbol {'!','@','#','$','%','&','*'}"});
    }

    //database querying
    const user = await User.findOne({resetToken: token});

            if (!user) {
                //email doesnt exist or token is invalid
                return res.status(400).json({ message: "If this email exists, you have been redirected to the homepage" });
            }

    //check if the token has expired
    if (user.resetTokenExpiry < Date.now()) {
        return res.status(400).json({ error: "Reset token has expired. Please request a new one." });
    }

    //encrypt the new password and save it to the database, also remove the reset token and expiry  
    const hashedPassword = await hashPassword(password);

    user.password = hashedPassword;
    user.resetToken = null;
    user.resetTokenExpiry = null;
    await user.save();
    
    //success response
    res.status(200).json({ success: true });

    } catch(err) {
        console.log(err);
        res.status(500).json({
            success: false,
            error: err.message
        });
    }
};


exports.forgotPassword = async (req, res) => {
    try {
        const email = req.body.email?.trim().toLowerCase();

        //validation rules
        if (!email) {
            return res.status(400).json({ error: "Email is required!" });
        }

        if (!email.includes('@')) {
            return res.status(400).json({ error: "Invalid email!" });
        }

        //database querying
        const user = await User.findOne({ email });

        if (!user) {
            //the email doesnt exist 
            return res.status(400).json({ message: "If this email exists, a reset link has been sent" });
        }

        //generating token and expiry...the token needs an attribute in the user table.
        const token = crypto.randomBytes(16).toString('hex');

        user.resetToken = token;
        user.resetTokenExpiry = Date.now() + 15 * 60 * 1000;
        await user.save();

        const resetUrl = `http://localhost:3000/reset-password.html?token=${token}`;

        await transporter.sendMail({
            from: '"MyApp" <your.email@gmail.com>',
            to: email,
            subject: "Password Reset",
            //this is html of what the email sent will look like
            html: `
<h2>Password Reset</h2>

<p>You requested a password reset.</p>

<p>
    <a href="${resetUrl}" 
       style="background-color: blue;
        color: white;
        padding: 6px 10px;
         text-decoration: none;">
       Reset Password
    </a>
</p>

<p><small>Expires in 15 minutes.</small></p>
`

        });

        res.status(200).json({
            message: "If this email exists, a reset link has been sent."
        });

    } catch (err) {
        console.error(err);
        res.status(500).json({ error: err.message });
    }
};

