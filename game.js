const question = document.getElementById("question");
const choices = Array.from(document.getElementsByClassName("choice-text"));
const progressText = document.getElementById("progressText");
const scoreText = document.getElementById("score");
const progressBarFull = document.getElementById("progressBarFull");
   
let presentQuestion = {};
let obtainAnswers = false; 
let score = 0;
let question_Counter = 0;
let possibleQuesions = [];   

let questions = [
  {
    question: "What does the term enforcement mean in PEO (Professional Engineering Ontario)?",
    choice1: "means preventing people with a licence or C of A from offering services to the public",
    choice2: "means preventing people without a licence or C of A from offering services to the public",
    choice3: "means preventing people without a licence from offering services to the public",
    choice4: "means preventing people with a licence from offering services to the public",
    answer: 2
  },
  {
    question: "What are the different types of licence related to practice of professional engineering in Ontario?",
    choice1: "A P.Eng. licence only",
    choice2: "P.Eng., A Temporary and Limited licence",
    choice3: "P.Eng., A Provisional, A Temporary and Limited licence",
    choice4: "A Provisional, A Temporary and Limited licence only",
    answer: 3
  },
  {
    question: "To be designated as a Consulting Engineer, What are the requirements?",
    choice1: "A P.Eng licence, two or more yrs. professional experience obtained after the P.Eng. and at least 1 yrs. in independent practice",
    choice2: "A P.Eng licence, two or more yrs. professional experience obtained after the P.Eng. and at least 2 yrs. in independent practice",
    choice3: "A P.Eng licence, five or more yrs. professional experience obtained after the P.Eng. and at least 1 yrs. in independent practice",
    choice4: "A P.Eng licence, five or more yrs. professional experience obtained after the P.Eng. and at least 2 yrs. in independent practice",
    answer: 4
  }
];

//CONSTANTS
const CORRECT_BONUS = 10;
const MAX_QUESTIONS = 3;

beginGame = () => {
  question_Counter = 0;
  score = 0;
  possibleQuesions = [...questions];
  getNewQuestion();
};

getNewQuestion = () => {
  if (possibleQuesions.length === 0 || question_Counter >= MAX_QUESTIONS) {
    localStorage.setItem("mostRecentScore", score);
    //To go the last page  
    return window.location.assign("./last.html");  
  }
  question_Counter++;
  progressText.innerText = `Question ${question_Counter}/${MAX_QUESTIONS}`; 
  //Renew the progress bar
  progressBarFull.style.width = `${(question_Counter / MAX_QUESTIONS) * 100}%`;

  const question_Index = Math.floor(Math.random() * possibleQuesions.length);
  presentQuestion = possibleQuesions[question_Index];
  question.innerText = presentQuestion.question;

  choices.forEach(choice => {
    const number = choice.dataset["number"];
    choice.innerText = presentQuestion["choice" + number];
  });

  possibleQuesions.splice(question_Index, 1);
  obtainAnswers = true;
};

choices.forEach(choice => {
  choice.addEventListener("click", e => {
    if (!obtainAnswers) return;

    obtainAnswers = false;
    const selectedChoice = e.target;
    const selectedAnswer = selectedChoice.dataset["number"];

    const classToApply =
      selectedAnswer == presentQuestion.answer ? "correct" : "incorrect";

    if (classToApply === "correct") {
      incrementScore(CORRECT_BONUS);
    }

    selectedChoice.parentElement.classList.add(classToApply);

    setTimeout(() => {
      selectedChoice.parentElement.classList.remove(classToApply);
      getNewQuestion();
    }, 1000);
  });
});

incrementScore = num => {
  score += num;
  scoreText.innerText = score;
};

beginGame();   