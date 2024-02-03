/**
 * An array of quiz data where each object represents a single quiz question.
 * Each question object has a `question` string, an `answers` array, and a `correctAnswer` string.
 */
const quizData = [
    {
        question: "What is the primary greenhouse gas responsible for global warming?",
        answers: ["Carbon Dioxide (CO2)", "Methane (CH4)", "Nitrous Oxide (N2O)", "Ozone (O3)"],
        correctAnswer: "Carbon Dioxide (CO2)"
    },
    {
        question: "Which human activity contributes significantly to deforestation and climate change?",
        answers: ["Mining", "Urbanization", "Agriculture", "Manufacturing"],
        correctAnswer: "Agriculture"
    },
    {
        question: "What is the main cause of rising sea levels?",
        answers: ["Melting ice caps and glaciers", "Ocean currents", "Underwater volcanoes", "Tectonic plate movements"],
        correctAnswer: "Melting ice caps and glaciers"
    },
    {
        question: "Which international agreement aims to combat climate change by limiting global warming?",
        answers: [
            "Kyoto Protocol",
            "Paris Agreement",
            "Montreal Protocol",
            "Copenhagen Accord"
        ],
        correctAnswer: "Paris Agreement"
    },
    {
        question: "What is the term for the gradual increase in Earth's average surface temperature?",
        answers: [
            "Global Cooling",
            "Climate Stability",
            "Greenhouse Effect",
            "Global Warming"
        ],
        correctAnswer: "Global Warming"
    }
];

let currentQuestion = 0;
let userAnswers = [];

/**
 * Initializes the quiz by displaying the first question.
 */
function initQuiz() {
    showQuestion();
}

/**
 * Displays the current question and its answers.
 */
function showQuestion() {
    const questionText = document.querySelector('#question-text');
    const answersContainer = document.querySelector('#answers-container');
    const currentQuizData = quizData[currentQuestion];

    questionText.textContent = currentQuizData.question;
    answersContainer.innerHTML = "";

    // Create HTML answers list in each question.
    currentQuizData.answers.forEach((answer, index) => {
        const answerElement = document.createElement('div');
        answerElement.classList.add('answer');
        answerElement.textContent = answer;
        answerElement.onclick = () => selectAnswer(index);

        answersContainer.appendChild(answerElement);
    });
}

function selectAnswer(index) {
    userAnswers[currentQuestion] = index;
    highlightSelectedAnswer();
}

function highlightSelectedAnswer() {
    const answerElements = document.querySelectorAll('.answer');
    answerElements.forEach((answerElement, index) => {
        answerElement.classList.remove('selected');

        if (index === userAnswers[currentQuestion]) {
            answerElement.classList.add('selected');
        }
    });
}

function nextQuestion() {
    if (userAnswers[currentQuestion] !== undefined) {
        currentQuestion++;
        if (currentQuestion === quizData.length) {
            currentQuestion = quizData.length - 1;
        }

        showQuestion();
        showButtons();
    }
    else {
        alert("You need to select an answer before moving on.");
    }
}

function prevQuestion() {
    currentQuestion--;

    if (currentQuestion < 0) {
        currentQuestion = 0;
    }
    showQuestion();
    highlightSelectedAnswer();
    showButtons();
}

function submitQuiz() {
    if (userAnswers[currentQuestion] === undefined) {
        alert("You need to select an answer before submitting.");
        return;
    }

    const score = calculateScore();
    const victorySound = new Audio('audio/victory.mp3');
    const defeatSound = new Audio('audio/defeat.mp3');
    if (score >= quizData.length - 1) {
        victorySound.play();
    } else {
        defeatSound.play();
    }
    showResults(score);
}

function calculateScore() {
    let score = 0;
    for (let index = 0; index < quizData.length; index++) {
        const questionData = quizData[index];
        const userAnswerIndex = userAnswers[index];
        const userAnswer = questionData.answers[userAnswerIndex];
        if (questionData.correctAnswer === userAnswer) {
            score++;
        }
    }
    return score;
}

function showResults(score) {
    const resultsSection = document.querySelector('#results-section');
    const scoreElement = document.querySelector('#score');
    const correctAnswersList = document.querySelector('#correct-answers');

    const scoreText = `Your Score: ${score} out of ${quizData.length}`;
    scoreElement.textContent = scoreText;


    correctAnswersList.innerHTML = "";

    for (let index = 0; index < quizData.length; index++) {
        const questionData = quizData[index];

        const userAnswerIndex = userAnswers[index];
        const userSelectedAnswer = questionData.answers[userAnswerIndex];
    
        const listItem = document.createElement('li');
    
        const questionNumber = index + 1;
        const questionText = questionData.question;
        const correctAnswer = questionData.correctAnswer;
        listItem.innerHTML = `
            <div class="question">
                <h3>Q${questionNumber}: ${questionText}</h3>
                <p><span class="label">Selected Answer:</span> <b>${userSelectedAnswer}</b></p>
                <p><span class="label">Answer Key:</span> <b>${correctAnswer}</b></p>
            </div>
        `;
        if (correctAnswer === userSelectedAnswer) {
            listItem.style.color = 'green';
        } else {
            listItem.style.color = 'red';
        }
    
        // Append the list item to the correct answers list
        correctAnswersList.appendChild(listItem);
    }

    resultsSection.style.display = 'block';
    document.querySelector('#question-section').style.display = 'none';

    // Hide all buttons
    const prevButton = document.querySelector('#prev-b');
    const nextButton = document.querySelector('#next-b');
    const submitButton = document.querySelector('#submit-b');
    const restartButton = document.querySelector('#restart-b');

    ['prev-b', 'next-b', 'submit-b'].forEach(buttonId => {
        document.getElementById(buttonId).style.display = 'none';
    });
    restartButton.style.display = 'inline-block'
}

function showButtons() {
    const prevButton = document.querySelector('#prev-b');
    const nextButton = document.querySelector('#next-b');
    const submitButton = document.querySelector('#submit-b');

    if (currentQuestion === 0) {
        prevButton.style.display = 'none';
    } else {
        prevButton.style.display = 'inline-block';
    }

    if (currentQuestion === quizData.length - 1) {
        nextButton.style.display = 'none';
        submitButton.style.display = 'inline-block';
    } else {
        nextButton.style.display = 'inline-block';
        submitButton.style.display = 'none';
    }
}


function restartQuiz() {
    //reset index and userAnswers
    currentQuestion = 0;
    userAnswers = [];
    //display buttons and question
    showQuestion();
    showButtons();

    // Hide the results section and show the question section
    const resultsSection = document.querySelector('#results-section');
    const questionSection = document.querySelector('#question-section');
    const restartButton = document.querySelector('#restart-b');

    resultsSection.style.display = 'none';
    restartButton.style.display = 'none';

    questionSection.style.display = 'block';
}