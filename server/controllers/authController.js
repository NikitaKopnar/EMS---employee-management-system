import User from "../models/User.js";
import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken';
// Login for Employee and admin



//POST /api/auth/login
export const login = async (req, res) => {
    try{
        const {email, password, role_type} = req.body;
        if(!email || !password) {
            return res.status(400).json({error:"Email and password are required"});
        }
        const user = await User.findOne({email});
        if(!user) {
            return res.status(401).json({error:"Invalid credentials"})
        }
        if(role_type === "admin" && user.role!=="ADMIN") {
            return res.status(401).json({error:"Not authorized as admin"});
        }
        if(role_type === "employee" && user.role!=="EMPLOYEE") {
            return res.status(401).json({error:"Not authorized as employee"});
        }
        const isValid = await bcrypt.compare(password, user.password)
        if(!isValid) {
            return res.status(401).json({error:"Invalid credentials"})
        }
        const payload = {
             userId: user._id.toString(),
             role:user.role,
             email:user.email,
        }
        const token = jwt.sign(payload,process.env.JWT_SECRET, {
            expiresIn: "7d"
        });
        return res.json({user:payload, token})
        
    }
    catch(error) {
        console.error("Login.error:", error);
        return res.status(500).json({error: "Login failed"})
    }
}

