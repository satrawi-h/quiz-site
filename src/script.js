document.addEventListener('DOMContentLoaded', function() {
    const fileInput = document.getElementById('file-input');
    fileInput.addEventListener('change', handleFileSelect);
    document.getElementById('home-button').addEventListener('click', resetQuiz);

});

let currentQuestionIndex = 0;
let quizData = [];
let originalQuizData = []; // Store the original quiz data
let wrongAnswers = [];
let score = 0;
let answered = false;
let timer;

function handleFileSelect(event) {
    resetQuiz();
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            const contents = e.target.result;
            try {
                const json = JSON.parse(contents);
                if (!isValidQuizData(json)) {
                    alert('Invalid JSON file format. Please check the structure.');
                    return;
                }
                originalQuizData = json.questions; // Store original data
                quizData = json.questions.slice(); // Create a copy
                showQuestion(currentQuestionIndex);
            } catch (error) {
                alert('Invalid JSON file: ' + error.message);
            }
        };
        reader.readAsText(file);
    }
}

function isValidQuizData(json) { // This function was missing!
    if (!json || !json.questions || !Array.isArray(json.questions)) {
        return false;
    }
    for (const question of json.questions) {
        if (!question.question || !question.choices || !Array.isArray(question.choices) || !question.answer || !question.choices.includes(question.answer)) {
            return false;
        }
    }
    return true;
}

function showQuestion(index) {
    clearTimeout(timer);
    const questionContainer = document.getElementById('question-container');
    questionContainer.innerHTML = '';
    const resultContainer = document.getElementById('result');
    resultContainer.style.display = 'none';
    answered = false;
    document.getElementById('retry-wrong').style.display = 'none';

    if (!quizData || quizData.length === 0) {
        questionContainer.innerHTML = "<p>No questions found in the file.</p>";
        document.getElementById('submit').style.display = 'none';
        return;
    }

    if (index >= quizData.length) {
        showResult();
        return;
    }

    const question = quizData[index];
    const questionElement = document.createElement('div');
    questionElement.classList.add('question');
    questionElement.innerHTML = `
        <h2>${question.question}</h2>
        ${question.choices.map((option, i) => `
            <div class="choice">
                <input type="radio" name="question" value="${option}" id="q-opt${i}">
                <label for="q-opt${i}">${option}</label>
            </div>
        `).join('')}
    `;
    questionContainer.appendChild(questionElement);

    const submitButton = document.getElementById('submit');
    submitButton.style.display = 'none';

    const choices = document.querySelectorAll('.choice label');
    choices.forEach(choice => {
        choice.addEventListener('click', () => {
            if (answered) return;
            answered = true;

            const selectedOption = choice.previousElementSibling;
            const isCorrect = selectedOption.value === question.answer;
            if (isCorrect) {
                choice.style.backgroundColor = '#28a745';
                choice.style.borderColor = '#28a745';
                score++;
                document.getElementById('score-display').textContent = `Score: ${score}`; // Update score display
            } else {
                choice.style.backgroundColor = '#dc3545';
                choice.style.borderColor = '#dc3545';
                choices.forEach(correctChoice => {
                    if(correctChoice.previousElementSibling.value === question.answer){
                        correctChoice.style.backgroundColor = '#28a745';
                        correctChoice.style.borderColor = '#28a745';
                    }
                })
                wrongAnswers.push(question); // Add wrong question to array
            }

            if(index === quizData.length - 1){
                submitButton.style.display = 'block';
            }else{
                timer = setTimeout(() => {
                    currentQuestionIndex++;
                    showQuestion(currentQuestionIndex);
                }, 1000);
            }
        });
    });

    submitButton.onclick = () => {
        showResult();
    };
}

function showResult() {
    clearTimeout(timer);
    const questionContainer = document.getElementById('question-container');
    questionContainer.innerHTML = '';
    const resultContainer = document.getElementById('result');
    resultContainer.style.display = 'block';
    resultContainer.textContent = `Your score: ${score} / ${originalQuizData.length}`;
    document.getElementById('submit').style.display = 'none';
    document.getElementById('retry-wrong').style.display = wrongAnswers.length > 0 ? 'block' : 'none';
}

function resetQuiz() {
    clearTimeout(timer);
    currentQuestionIndex = 0;
    quizData = originalQuizData.slice(); // Reset to the original data
    wrongAnswers = [];
    score = 0;
    answered = false;
    document.getElementById('question-container').innerHTML = '';
    document.getElementById('result').style.display = 'none';
    document.getElementById('submit').style.display = 'none';
    document.getElementById('retry-wrong').style.display = 'none';
    document.getElementById('score-display').textContent = `Score: ${score}`;
}

document.getElementById('retry-wrong').addEventListener('click', () => {
    quizData = wrongAnswers.slice();
    wrongAnswers = [];
    currentQuestionIndex = 0;
    score = 0;
    showQuestion(currentQuestionIndex);
});