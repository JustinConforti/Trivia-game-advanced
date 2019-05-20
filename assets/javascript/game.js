
// start page with a start button that switches to game screen
// timer starts at 30 and ticks down every second until zero
// displays first question and shows four button answers that are clickable
// once an answer is picked or timer reaches zero display the correct answer (with a gif/picture)
// automatically switch to next question after (5?) seconds and display new question with new answers and reset timer at 30 seconds
// after all answers are picked display a stats screen with correct / wrong amount as well as a restart button that will start 
// the game over    
$(document).ready(function () {

$('#start-screen').show();
$("#game").hide();
$("#start-timer").on("click", startGame);
let answerField = document.getElementById("answers")
let questionsField = document.getElementById("questions")
let timeClock = document.getElementById("timeRemainingCounter")
let correctAnswer = 0;
let incorrectAnswer = 0;
let displayNextQuestion = 0;
var timeRemaining = 0;
var intervalTimer;
let imageTime;
var clockRunning = false;
let questionCreated = false;
let imageTimeRemaining = 8


var quotes = [{
    question: 'Sometimes the right path is not the easiest one.',
    answers: ['Finding Nemo', 'Pocahontas', 'The AristoCats', 'Peter Pan'],
    correct: 'Pocahontas',
    images: ["assets/images/mouses.jpg"]
},
{
    question: "Ohana means family, and family means no one gets left behind or forgotten.",
    answers: ['Lilo &amp; Stitch', 'Mulan', 'Cinderella', 'Fox &amp; the Hound'],
    correct: 'Lilo &amp; Stitch',
    images: ["assets/images/mouses.jpg"]
},
{
    question: "The flower that blooms in adversity is the most rare and beaufitul of them all.",
    answers: ['Lion King', 'Pocahontas', 'Mulan', 'Pinocchio'],
    correct: 'Mulan',
    images: ["assets/images/mouses.jpg"]
},
{
    question: "Ladies do not start fights, but they can finish them.",
    answers: ['The AristoCats', 'Alice in Wonderland', 'Lion King', 'Peter Pan'],
    correct: 'The AristoCats',
    images: ["assets/images/mouses.jpg"]
},
{
    question: "Nothing's impossible.",
    answers: ['Dumbo', 'Lilo &amp; Stitch', 'Finding Nemo', 'Alice in Wonderland'],
    correct: 'Alice in Wonderland',
    images: ["assets/images/mouses.jpg"]
},
{
    question: "Second star to the right and straight on 'til morning",
    answers: ['Aladdin', 'Toy Story', 'Cinderella', 'Peter Pan'],
    correct: 'Peter Pan',
    images: ["assets/images/mouses.jpg"]
}
];


function startGame() {
    

    if (!clockRunning) {
        clearInterval(displayNextQuestion);
        clearInterval(imageTime);


        clockRunning = true;
        timeRemaining = 5;
        $('#game').show();
        $('#start-screen').hide();
        // populateQuestions()
        // if(noQuestions === false) {
     populateQuestions()
    }
        // }
        if (clockRunning = true) {
    intervalTime = setInterval(function () {
        // let timeClock = document.getElementById("timeRemainingCounter")
        // countdown from 30 sec
        
        timeRemaining--;
        timeClock.innerHTML = "You have " + timeRemaining + " seconds remaining";
        questionCreated = false;
        populateAnswers()
        console.log(timeRemaining)
        // when time is 0 will go to stats page, gameover
        if (timeRemaining === 0 ) {
            
            // doneGame();
            // timeRemaining = 5;
            clockRunning = false;
            // displayNextQuestion = setInterval(populateQuestions, 5000);
            showImage();
        };
    },
    1000);
}
}




function populateQuestions() {
    answerField.innerText = ""
    questionsField.innerText = ""
    let questionText = $("<span>").html(quotes[0].question);
    //  questionField.attr("data-question0")
    //  questionField.text = quotes[0].question;
    // $("#questions").append(questionField)
    (questionText).appendTo("#questions")
    questionCreated = true
    populateAnswers();
}

function populateAnswers () {
    // console.log(timeRemaining)

    if (questionCreated) {
    for (let i = 0; i < quotes[0].answers.length; i++) {

        let answerButton = $("<button>").html(quotes[0].answers[i])
        answerButton.appendTo("#answers")
    }
// }
//     if (timeRemaining === 0){
//         timeRemaining = 5;

//         quotes.shift();
//         console.log(quotes)
//         populateQuestions();
//     }
   

}


}

function showImage() {
    clockRunning = false;
    clearInterval(intervalTime);

    timeRemaining = 5;
    imageTimeRemaining = 8

    console.log("hey")
//     let answerField = document.getElementById("answers")
//     let questionsField = document.getElementById("questions")
    answerField.innerText = ""
    let answerPicture = $("<img>")
    $(answerPicture).attr("src", quotes[0].images[0])
    answerPicture.appendTo("#questions")

    // answerField.innerText = ""
    imageTime = setInterval(function () {
        // let timeClock = document.getElementById("timeRemainingCounter")
        // countdown from 30 sec
      
        imageTimeRemaining--;
        timeClock.innerText = ("Next question will display in " +imageTimeRemaining + " seconds")
        // questionCreated = false;
        // populateAnswers()
        console.log(timeRemaining)
        // when time is 0 will go to stats page, gameover
       
    },
    1000);

    displayNextQuestion = setInterval(restartRound, 8800);

    

}
function restartRound() {
    let answerField = document.getElementById("answers")
    let questionsField = document.getElementById("questions")
    questionsField.innerText = ""
    answerField.innerText = ""
    quotes.shift(); 
    // clearInterval(intervalTime);
    console.log(quotes)

    startGame()


    
}
})

