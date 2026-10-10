const questions = {
  HR: [
    {
      q: "Tell me about yourself.",
      a: "Introduce your education, technical skills, projects, and career goal."
    },
    {
      q: "What are your strengths?",
      a: "Mention strengths such as problem-solving, teamwork, and willingness to learn. Give an example."
    },
    {
      q: "Why should we hire you?",
      a: "Explain how your skills, project experience, and learning attitude can help the company."
    },
    {
      q: "What is your career goal?",
      a: "Describe how you want to improve your technical skills and contribute to real projects."
    },
    {
      q: "What is one weakness you are improving?",
      a: "Choose a genuine weakness and explain the practical steps you are taking to improve it."
    }
  ],

  Programming: [
    {
      q: "What is a variable?",
      a: "A variable is a named storage location used to hold a value in a program."
    },
    {
      q: "What is a function?",
      a: "A function is a reusable block of code that performs a particular task."
    },
    {
      q: "What is an array?",
      a: "An array stores multiple elements of the same data type under one name in languages such as C."
    },
    {
      q: "What is a loop?",
      a: "A loop repeatedly executes a block of code while a condition is satisfied or for a set number of iterations."
    },
    {
      q: "What is object-oriented programming?",
      a: "OOP is a programming approach based on objects and concepts such as encapsulation, inheritance, polymorphism, and abstraction."
    }
  ],

  DBMS: [
    {
      q: "What is a DBMS?",
      a: "A Database Management System is software used to create, store, retrieve, and manage data."
    },
    {
      q: "What is a primary key?",
      a: "A primary key uniquely identifies each row in a table."
    },
    {
      q: "What is a foreign key?",
      a: "A foreign key connects tables by referring to a key in another table or the same table."
    },
    {
      q: "What is normalization?",
      a: "Normalization organizes database tables to reduce unnecessary duplication and improve data integrity."
    },
    {
      q: "What is SQL?",
      a: "SQL is a language used to define, query, and manipulate data in relational databases."
    }
  ],

  OS: [
    {
      q: "What is an operating system?",
      a: "An operating system manages computer hardware, software resources, files, and running processes."
    },
    {
      q: "What is a process?",
      a: "A process is a program that is currently executing."
    },
    {
      q: "What is a thread?",
      a: "A thread is a unit of execution within a process."
    },
    {
      q: "What is deadlock?",
      a: "Deadlock occurs when processes wait indefinitely for resources held by one another."
    },
    {
      q: "What is virtual memory?",
      a: "Virtual memory uses storage to extend the memory available to running programs."
    }
  ],

  Networks: [
    {
      q: "What is a computer network?",
      a: "A computer network connects devices so they can communicate and share resources."
    },
    {
      q: "What is an IP address?",
      a: "An IP address identifies a device or network interface for communication over an IP network."
    },
    {
      q: "What is DNS?",
      a: "DNS translates domain names, such as example.com, into IP addresses."
    },
    {
      q: "What is HTTP?",
      a: "HTTP is a protocol used to transfer web resources between clients and servers."
    },
    {
      q: "What is the difference between TCP and UDP?",
      a: "TCP provides reliable, ordered delivery. UDP has lower overhead but does not guarantee delivery or order."
    }
  ]
};

const category = document.getElementById("category");
const question = document.getElementById("question");
const answer = document.getElementById("answer");
const answerBox = document.getElementById("answerBox");
const questionCount = document.getElementById("questionCount");
const progress = document.getElementById("progress");

let index = 0;
let viewed = JSON.parse(localStorage.getItem("placeready_interview_viewed") || "{}");

function showQuestion() {
  const list = questions[category.value];
  question.textContent = list[index].q;
  answer.textContent = list[index].a;
  answerBox.hidden = true;
  questionCount.textContent = `Question ${index + 1} of ${list.length}`;

  viewed[category.value + index] = true;
  localStorage.setItem("placeready_interview_viewed", JSON.stringify(viewed));
  progress.textContent = `Questions viewed: ${Object.keys(viewed).length}`;
}

document.getElementById("showAnswer").addEventListener("click", () => {
  answerBox.hidden = false;
});

document.getElementById("nextQuestion").addEventListener("click", () => {
  index = (index + 1) % questions[category.value].length;
  showQuestion();
});

category.addEventListener("change", () => {
  index = 0;
  showQuestion();
});

showQuestion();