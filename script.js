const startButton = document.getElementById('start-button');
const questionContainer = document.getElementById('question-container');
const questionNumberDisplay = document.getElementById('question-number');
const questionTextDisplay = document.getElementById('question-text');
const optionsList = document.getElementById('options-list');
const scoreScreen = document.getElementById('score-screen');
const messageContainer = document.getElementById('message-container');
const startScreen = document.getElementById('start-screen');
const finalScoreDisplay = document.getElementById('final-score');
const restartButton = document.getElementById('restart-button');

let currentQuestionIndex = 0;
let score = 0;
let userAnswers = [];

const quizData = [
    {
        question: "What is the capital of France?",
        options: ["London", "Paris", "Berlin", "Rome"],
        correctAnswer: "Paris"
    },
    {
        question: "What is the highest mountain in the world?",
        options: ["K2", "Kangchenjunga", "Mount Everest", "Lhotse"],
        correctAnswer: "Mount Everest"
    },
    {
        question: "What is the chemical symbol for gold?",
        options: ["Au", "Ag", "Fe", "Cu"],
        correctAnswer: "Au"
    },
    {
        question: "Which planet is known as the 'Red Planet'?",
        options: ["Venus", "Mars", "Jupiter", "Saturn"],
        correctAnswer: "Mars"
    },
    {
        question: "What is the largest ocean on Earth?",
        options: ["Atlantic Ocean", "Indian Ocean", "Arctic Ocean", "Pacific Ocean"],
        correctAnswer: "Pacific Ocean"
    },
    {
        question: "Who painted the Mona Lisa?",
        options: ["Vincent van Gogh", "Leonardo da Vinci", "Pablo Picasso", "Claude Monet"],
        correctAnswer: "Leonardo da Vinci"
    },
    {
        question: "What is the currency of Japan?",
        options: ["Yuan", "Won", "Yen", "Ringgit"],
        correctAnswer: "Yen"
    },
    {
        question: "What is the chemical symbol for water?",
        options: ["Wo", "Wa", "H2O", "HO2"],
        correctAnswer: "H2O"
    },
    {
        question: "Which animal is known as the 'King of the Jungle'?",
        options: ["Tiger", "Elephant", "Lion", "Cheetah"],
        correctAnswer: "Lion"
    },
    {
        question: "What is the name of the first man to walk on the moon?",
        options: ["Buzz Aldrin", "Neil Armstrong", "Yuri Gagarin", "Alan Shepard"],
        correctAnswer: "Neil Armstrong"
    }
];

startButton.addEventListener('click', startQuiz);


function startQuiz() {
    startScreen.classList.add('d-none');
    questionContainer.classList.remove('d-none');
    loadQuestion();
}

function loadQuestion() {
    messageContainer.textContent = '';
    questionNumberDisplay.textContent = `Question ${currentQuestionIndex + 1}`;
    questionTextDisplay.textContent = quizData[currentQuestionIndex].question;
    optionsList.innerHTML = '';

    quizData[currentQuestionIndex].options.forEach((option, index) => {
        const listItem = document.createElement('li');
        listItem.textContent = option;
        listItem.classList.add('list-group-item', 'list-group-item-action', 'rounded-md', 'py-2', 'px-3', 'cursor-pointer', 'transition', 'duration-300', 'ease-in-out');
        listItem.dataset.option = option;
        listItem.addEventListener('click', handleOptionSelect);
        optionsList.appendChild(listItem);
    });
}

function handleOptionSelect(event) {
    const selectedOption = event.target.dataset.option;
    userAnswers[currentQuestionIndex] = selectedOption;

    Array.from(optionsList.children).forEach(item => {
        item.classList.remove('list-group-item-action', 'cursor-pointer');
        item.classList.add('disabled');
    });

    if (selectedOption === quizData[currentQuestionIndex].correctAnswer) {
        event.target.classList.add('bg-success', 'text-white');
        score++;
    } else {
        event.target.classList.add('bg-danger', 'text-white');
    }

    currentQuestionIndex++;

    if (currentQuestionIndex < quizData.length) {
        setTimeout(loadQuestion, 500);
    } else {
        showScore();
    }
}

function showScore() {
    questionContainer.classList.add('d-none');
    scoreScreen.classList.remove('d-none');
    finalScoreDisplay.textContent = `You scored ${score} out of ${quizData.length}!`;

    let message = `<div class="mt-4 text-left space-y-2">
                           <h3 class="font-semibold text-blue-600">Correct Answers:</h3>
                           <ul class="list-disc list-inside space-y-1">`;
    quizData.forEach((q, index) => {
        const userAnswer = userAnswers[index] || "Not answered";
        const isCorrect = userAnswer === q.correctAnswer;
        message += `<li class="${isCorrect ? 'text-success' : 'text-danger'}">
                            <span class="font-medium">${q.question}</span>:
                            <span class="${isCorrect ? 'font-bold' : ''}">${q.correctAnswer}</span>
                            (Your answer: <span class="${isCorrect ? 'font-bold' : ''}">${userAnswer}</span>)
                           </li>`;
    });
    message += `</ul></div>`;
    messageContainer.innerHTML = message;
    const restartButton = document.createElement('button');
    restartButton.textContent = 'Restart Quiz';
    restartButton.classList.add('btn', 'btn-primary', 'mt-4');
    restartButton.addEventListener('click', restartQuiz);
    scoreScreen.appendChild(restartButton);
}

function restartQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    userAnswers = [];
    scoreScreen.classList.add('d-none');
    startScreen.classList.remove('d-none');
    questionContainer.classList.add('d-none');
    
    startQuiz();
}