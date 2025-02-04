document.addEventListener("DOMContentLoaded", () => {
    let currentQuestionIndex = 0;
    let score = 0;
    let questions = [];

    const questionNumberElement = document.getElementById("question-number");
    const questionElement = document.getElementById("question");
    const optionsElement = document.getElementById("options");
    const nextButton = document.getElementById("next-btn");
    const scoreElement = document.getElementById("score");

    // Fetch quiz questions from the server
    fetch("/questions")
        .then(response => response.json())
        .then(data => {
            questions = data;
            showQuestion();
        })
        .catch(error => console.error("Error loading questions:", error));

    function showQuestion() {
        if (currentQuestionIndex >= questions.length) {
            // Display Final Score
            questionElement.innerText = `Quiz Completed! Your Final Score: ${score}/${questions.length}`;
            optionsElement.innerHTML = "";
            questionNumberElement.innerText = "";
            nextButton.style.display = "none";
            return;
        }

        const questionData = questions[currentQuestionIndex];
        questionNumberElement.innerText = `Question ${currentQuestionIndex + 1} of ${questions.length}`;
        questionElement.innerText = questionData.question;
        optionsElement.innerHTML = "";

        questionData.options.forEach(option => {
            const button = document.createElement("button");
            button.innerText = option;
            button.classList.add("option-btn");
            button.addEventListener("click", () => checkAnswer(button, option, questionData.answer));
            optionsElement.appendChild(button);
        });

        nextButton.style.display = "none";
    }

    function checkAnswer(selectedButton, selectedOption, correctAnswer) {
        // Disable all options after clicking one
        const buttons = document.querySelectorAll(".option-btn");
        buttons.forEach(button => button.disabled = true);

        if (selectedOption === correctAnswer) {
            selectedButton.classList.add("correct"); // Highlight correct answer in green
            score++; // Increment score
        } else {
            selectedButton.classList.add("wrong"); // Highlight wrong answer in red
            buttons.forEach(button => {
                if (button.innerText === correctAnswer) {
                    button.classList.add("correct"); // Highlight the correct answer
                }
            });
        }

        scoreElement.innerText = `Score: ${score}`; // Update score
        nextButton.style.display = "block"; // Show Next button
    }

    nextButton.addEventListener("click", () => {
        currentQuestionIndex++;
        showQuestion();
    });
});
