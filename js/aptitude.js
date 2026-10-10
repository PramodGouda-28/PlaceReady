const quiz = [
  { q: "What is 20% of 150?", o: ["20", "30", "40", "50"], a: 1 },
  { q: "A product costs ₹500. What is its price after a 10% discount?", o: ["₹450", "₹400", "₹490", "₹550"], a: 0 },
  { q: "What is 25% of 80?", o: ["10", "15", "20", "25"], a: 2 },

  { q: "The ratio is 2:3 and the total is 25. What is the smaller part?", o: ["5", "10", "15", "20"], a: 1 },
  { q: "Simplify the ratio 12:18.", o: ["2:3", "3:2", "4:5", "6:9"], a: 0 },
  { q: "Divide 40 in the ratio 1:3. What is the smaller part?", o: ["5", "10", "20", "30"], a: 1 },

  { q: "A person completes a job in 10 days. What fraction of the job is completed in one day?", o: ["1/5", "1/10", "1/2", "10"], a: 1 },
  { q: "A can finish a job in 6 days. How much of the job can A finish in 2 days?", o: ["1/2", "1/3", "1/6", "2/3"], a: 1 },
  { q: "If 4 workers finish a job in 6 days, how many worker-days are needed?", o: ["10", "12", "24", "30"], a: 2 },

  { q: "Find the next number: 2, 4, 6, 8, ?", o: ["9", "10", "12", "14"], a: 1 },
  { q: "Find the next number: 3, 6, 12, 24, ?", o: ["30", "36", "48", "60"], a: 2 },
  { q: "Find the next number: 1, 4, 9, 16, ?", o: ["20", "24", "25", "36"], a: 2 },

  { q: "All roses are flowers. Which statement must be true?", o: ["All flowers are roses", "All roses are flowers", "No roses are flowers", "All flowers are red"], a: 1 },
  { q: "If today is Monday, what day will it be after 3 days?", o: ["Tuesday", "Wednesday", "Thursday", "Friday"], a: 2 },
  { q: "Choose the odd one out.", o: ["Apple", "Mango", "Carrot", "Banana"], a: 2 }
];

let index = 0;
let score = 0;
let answered = false;

const question = document.getElementById("question");
const options = document.getElementById("options");
const feedback = document.getElementById("feedback");
const questionNumber = document.getElementById("questionNumber");
const submitButton = document.getElementById("submitAnswer");
const nextButton = document.getElementById("nextQuestion");
const result = document.getElementById("result");
const restartButton = document.getElementById("restartQuiz");

function showQuestion() {
  answered = false;
  feedback.textContent = "";
  result.textContent = "";
  questionNumber.textContent = `Question ${index + 1} of ${quiz.length}`;
  question.textContent = quiz[index].q;
  options.replaceChildren();

  quiz[index].o.forEach((option, i) => {
    const label = document.createElement("label");
    const radio = document.createElement("input");

    radio.type = "radio";
    radio.name = "answer";
    radio.value = i;

    label.append(radio, document.createTextNode(" " + option));
    label.style.display = "block";
    label.style.margin = "12px 0";
    options.appendChild(label);
  });

  submitButton.hidden = false;
  submitButton.disabled = false;
  nextButton.hidden = true;
}

submitButton.addEventListener("click", () => {
  if (answered) return;

  const selected = document.querySelector('input[name="answer"]:checked');

  if (!selected) {
    feedback.textContent = "Please select an answer first.";
    return;
  }

  answered = true;

  if (Number(selected.value) === quiz[index].a) {
    score++;
    feedback.textContent = "Correct! Well done.";
  } else {
    feedback.textContent =
      "Incorrect. Correct answer: " + quiz[index].o[quiz[index].a];
  }

  submitButton.disabled = true;
  nextButton.hidden = false;
});

nextButton.addEventListener("click", () => {
  index++;

  if (index < quiz.length) {
    showQuestion();
  } else {
    question.textContent = "Quiz completed!";
    questionNumber.textContent = "Your final result";
    options.replaceChildren();
    feedback.textContent = `You scored ${score} out of ${quiz.length}.`;
    result.textContent =
      `Percentage: ${Math.round(score / quiz.length * 100)}%`;

    submitButton.hidden = true;
    nextButton.hidden = true;
    restartButton.hidden = false;

    localStorage.setItem("placeready_aptitude_score", score);
  }
});

restartButton.addEventListener("click", () => {
  index = 0;
  score = 0;
  restartButton.hidden = true;
  showQuestion();
});

showQuestion();