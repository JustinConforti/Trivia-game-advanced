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
    $("#stat-screen").hide();
    $("#start-timer").on("click", startGame);
    $("#restart-button").on("click", restartGame);
    
    $("#main-picture").html("<img src=assets/images/group-picture.jpg height='250px' width='500px'>");

    let answerField = document.getElementById("answers");
    let questionsField = document.getElementById("questions");
    let timeClock = document.getElementById("timeRemainingCounter");
    let correctAnswer = 0;
    let incorrectAnswer = 0;
    correctAnswerDisplay = document.getElementById("correctAnswerTotal");
    incorrectAnswerDisplay = document.getElementById("incorrectAnswerTotal");
    let displayNextQuestion = 0;
    var timeRemaining = 0;
    var intervalTime;
    let imageTime;
    var clockRunning = false;
    let questionCreated = false;
    let imageTimeRemaining = 8
    let answerPicked = false;
    let showSlideShowImage;
    let imageCount = 0;
    var images = ["assets/images/cover-gif01.gif", "assets/images/cover-gif02.gif", "assets/images/cover-gif03.gif"];


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
                    if (timeRemaining === 0) {

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
        questionText.appendTo("#questions")
        questionCreated = true
        populateAnswers();
    }

    function populateAnswers() {
        // console.log(timeRemaining)

        if (questionCreated) {
            for (let i = 0; i < quotes[0].answers.length; i++) {

                let answerButton = $("<button>").html(quotes[0].answers[i]).addClass("answerButton")
                answerButton.attr("id", quotes[0].answers[i])
                answerButton.attr({
                    "data-value": quotes[0].answers[i]
                })
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

    $(document).on("click", ".answerButton", function () {
        answerPicked = true;
        console.log('hey')
        userChoice = $(this).attr("data-value");
        if (userChoice === quotes[0].correct){
            correctAnswer ++
            questionsField.innerText = "You are correct! The answer is " + userChoice
            showImage()
            console.log("correct choice")
        } else {
            incorrectAnswer ++
            questionsField.innerText = "The correct answer was " + quotes[0].correct
            showImage()
            console.log("incorrect choice")
        }
        console.log(userChoice)
        // showImage()
    })



    function showImage() {
        clockRunning = false;
        clearInterval(intervalTime);

        timeRemaining = 5;
        imageTimeRemaining = 8

        // console.log("hey")
        //     let answerField = document.getElementById("answers")
        //     let questionsField = document.getElementById("questions")
        answerField.innerText = ""
        let answerPicture = $("<img>")
        $(answerPicture).attr("src", quotes[0].images[0])
        answerPicture.appendTo("#questions")

        if(answerPicked === false ) {
            questionsField.innerText = "You ran out of time, make sure you pick an answer next time"
            answerField.innerText = "The correct answer was " + quotes[0].correct
            incorrectAnswer ++

        }
        incorrectAnswerDisplay.innerText = incorrectAnswer
        correctAnswerDisplay.innerText = correctAnswer

        // answerField.innerText = ""
        imageTime = setInterval(function () {
                // let timeClock = document.getElementById("timeRemainingCounter")
                // countdown from 30 sec
                imageTimeRemaining--;
                timeClock.innerText = ("Next question will display in " + imageTimeRemaining + " seconds")
                // questionCreated = false;
                // populateAnswers()
                console.log(timeRemaining)
                // when time is 0 will go to stats page, gameover

            },
            1000);

        displayNextQuestion = setInterval(restartRound, 8000);



    }

    function restartRound() {
        answerPicked = false;
        let answerField = document.getElementById("answers")
        let questionsField = document.getElementById("questions")
        incorrectAnswerDisplay.innerText = incorrectAnswer
        questionsField.innerText = ""
        answerField.innerText = ""
        quotes.shift();
        // clearInterval(intervalTime);
        console.log(quotes)

        if(quotes.length > 0) {
            startGame()
        } else {
            console.log("Game Over")
            $("#game").hide();
            $("#stat-screen").show();
        }
    }

    function restartGame() {
        quotes = [{
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
    correctAnswer = 0;
    incorrectAnswer = 0;
    // incorrectAnswerDisplay.innerText = incorrectAnswer
    // correctAnswerDisplay.innerText = correctAnswer
    $('#start-screen').show();
    $("#game").hide();
    $("#stat-screen").hide();
    startGame()
    }

    
function startSlideshow() {

    // TODO: Use showImage to hold the setInterval to run nextImage.
    showSlideShowImage = setInterval(nextImage, 3000);
  
  }

  function displayImage() { 
    $("#main-picture").html("<img src=" + images[imageCount] + " height='250px' width='500px'>");
  }

  function nextImage() {
    //  TODO: Increment the count by 1.
    imageCount++;
    // TODO: If the count is the same as the length of the image array, reset the count to 0.
    if (imageCount === images.length) {
      imageCount = 0;
    }
    displayImage();
  }
  startSlideshow()
  
})