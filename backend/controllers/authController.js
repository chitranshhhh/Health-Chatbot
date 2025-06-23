import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User  from '../models/user.js';

export const signup = async (req, res) => {
    try {
        const { username, email, password } = req.body;

        if (!username || !email || !password) {
            return res.status(400).json({ error: "All fields are required" });
        }

        const existingUser = await User.findOne({ where: { email } });
        if (existingUser) {
            return res.status(400).json({ error: "Email already in use" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = await User.create({ username, email, password: hashedPassword });

        res.status(201).json({ message: "User created successfully", user: newUser });
    } catch (error) {
        console.error("❌ Signup error:", error);
        res.status(500).json({ error: error.message || "Signup failed" });
    }
};



export const login = async (req, res) => {
    try {
        console.log("Login request received:", req.body); // Debugging

        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ error: "Email and password are required" });
        }

        const user = await User.findOne({ where: { email } });

        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.status(401).json({ error: "Invalid credentials" });
        }

        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.status(200).json({ user, token }); // ✅ Ensure correct response
    } catch (error) {
        console.error("❌ Login error:", error);
        res.status(500).json({ error: "Login failed" });
    }
};
export default { signup, login }; // Adjust based on your functions
