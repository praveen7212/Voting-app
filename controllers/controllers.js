const User = require('../models/models');
const Candidate = require('../models/candidates');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


exports.signup = async (req, res) => {
    try {

        const { name, email, password } = req.body;

        const userExists = await User.findOne({ email });

        if (userExists) {
            return res.status(400).json({
                message: "User already exists"
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await User.create({
            name,
            email,
            password: hashedPassword
        });

        res.status(201).json({
            message: "Signup Successful",
            user
        });

    } catch (err) {
        res.status(500).json({
            message: err.message
        });
    }
};

exports.login = async (req, res) => {
    try {

        const { email, password } = req.body;

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(400).json({
                message: "Invalid Password"
            });
        }

        const token = jwt.sign(
            {
                id: user._id
            },
            process.env.JWT_SECRET,
            {
                expiresIn: "1d"
            }
        );

        res.status(200).json({
            message: "Login Success",
            token
        });

    } catch (err) {
        res.status(500).json({
            message: err.message
        });
    }
};


exports.addCandidate = async (req, res) => {
    try {

        const candidate = await Candidate.create(req.body);

        res.status(201).json({
            message: "Candidate Added Successfully",
            candidate
        });

    } catch (err) {
        res.status(500).json({
            message: err.message
        });
    }
};

exports.getCandidates = async (req, res) => {
    try {

        const candidates = await Candidate.find();

        res.status(200).json(candidates);

    } catch (err) {
        res.status(500).json({
            message: err.message
        });
    }
};


exports.voteCandidate = async (req, res) => {
    try {

        const user = await User.findById(req.user.id);

        if (!user) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        if (user.hasVoted) {
            return res.status(400).json({
                message: "You have already voted"
            });
        }

        const candidate = await Candidate.findById(req.params.id);

        if (!candidate) {
            return res.status(404).json({
                message: "Candidate not found"
            });
        }

        candidate.voteCount += 1;
        await candidate.save();

        user.hasVoted = true;
        await user.save();

        res.status(200).json({
            message: "Vote Submitted Successfully"
        });

    } catch (err) {
        res.status(500).json({
            message: err.message
        });
    }
};


exports.getResults = async (req, res) => {
    try {

        const results = await Candidate.find().sort({
            voteCount: -1
        });

        res.status(200).json(results);

    } catch (err) {
        res.status(500).json({
            message: err.message
        });
    }
};