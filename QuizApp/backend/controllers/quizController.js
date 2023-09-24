const { validationResult } = require("express-validator");
const Quiz = require("../models/Quiz");

// Get All the QUIZ
const fetchAllQuiz = async (req, res) => {
    try {
        const quizs = await Quiz.find({ user: req.user.id });
        res.json(quizs);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
};

// Fetch all the JSON for quiz collection
const fetchAllQuizNoAuthentication = async (req, res) => {
    try {
        const quizs = await Quiz.find({ code: req.params.message });
        res.json(quizs);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
};

// Add a new quiz
const addQuiz = async (req, res) => {
    try {
        const { question, option1, option2, option3, option4, answer, title, mcq, code } = req.body;

        // If there are errors, return bad req and the errors
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const quiz = new Quiz({
            question,
            option1,
            option2,
            option3,
            option4,
            answer,
            title,
            mcq,
            code,
            user: req.user.id,
        });

        const savedQuiz = await quiz.save();

        // to send the saved quiz in the response
        res.json(savedQuiz);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
};

// Update an existing quiz
const updateQuiz = async (req, res) => {
    const { question, option1, option2, option3, option4, answer, title, mcq, code } = req.body;
    //Create a new quiz object
    const newQuiz = {};
    if (question) {
        newQuiz.question = question;
    }
    if (option1) {
        newQuiz.option1 = option1;
    }
    if (option2) {
        newQuiz.option2 = option2;
    }
    if (option3) {
        newQuiz.option3 = option3;
    }
    if (option4) {
        newQuiz.option4 = option4;
    }
    if (answer) {
        newQuiz.answer = answer;
    }
    if (title) {
        newQuiz.title = title;
    }
    if (mcq) {
        newQuiz.mcq = mcq;
    }
    if (code) {
        newQuiz.code = code;
    }

    //Find the quiz to be updated and update it
    try {
        var quiz = await Quiz.findById(req.params.id);
        if (!quiz) {
            res.status(404).send("Not Found");
        }
        if (quiz.user.toString() !== req.user.id) {
            return res.status(401).send("Not Allowed");
        }
        quiz = await Quiz.findByIdAndUpdate(req.params.id, { $set: newQuiz }, { new: true });
        res.json({ quiz });
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
};

// Update code for quizzes by user
const updateCode = async (req, res) => {
    const { code } = req.body;
    //Create a new quiz object
    const newQuiz = {};
    if (code) {
        newQuiz.code = code;
    }

    // Find and update quizzes based on user
    try {
        const quiz = await Quiz.updateMany({ user: req.params.id }, { $set: newQuiz }, { new: true });
        res.json({ quiz });
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
};

// Delete an existing quiz
const deleteQuiz = async (req, res) => {
    //Find the quiz to be deleted and delete it
    try {
        let quiz = await Quiz.findById(req.params.id);
        if (!quiz) {
            res.status(404).send("Not Found");
        }
        //Allow deletion only if user owns this quiz
        if (quiz.user.toString() !== req.user.id) {
            //if not authenticated user
            return res.status(401).send("Not Allowed");
        }
        quiz = await Quiz.findByIdAndDelete(req.params.id);
        res.json({ Success: "Quiz has been deleted" });
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
};

module.exports = {
    fetchAllQuiz,
    fetchAllQuizNoAuthentication,
    addQuiz,
    updateQuiz,
    updateCode,
    deleteQuiz,
};
