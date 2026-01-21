//src/controllers/auth.controller.js 

const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.register = async (req, res) => {
    const { name, emai, password } = req.body;
    const hashed = await bcrypt.hash(password, 10);

    const user = await User.create({ name, email, password: hashed });
    res.status(201).json({ message: 'User registered successfully', userId: user._id });
};

exports.login = async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user || !(await bcrypt.compare(password, user.password))) {
        return res.status(401).json({ message: 'Invalid email or password' });

        const token = jwt.sign(
            { i: user._id, role: user.role },
            process.env.JWT_SECRET,
            { expiresIn: '1h' } 
        );
        res.json({ token, role: user.role });
    }
};
