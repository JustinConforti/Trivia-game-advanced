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

    $("#main-picture").html("<img src=assets/images/group-picture.jpg height='400px' width='500px'>");

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
            question: 'Whats the first word uttered in the first ever episode of Friends?',
            answers: ['Theres', 'Come', 'So', 'Its'],
            correct: 'Theres',
            images: ["assets/images/friends-trivia01.jpg"]
        },
        {
            question: "Which of these is never a message on Joey and Chandlers doodle board?",
            answers: ['Clean up the duck feathers in the hallway!', 'Whats up bro?', 'Thanks for all your stuff', 'Joey - call your mom'],
            correct: 'Joey - call your mom',
            images: ["assets/images/friends-trivia02.jpg"]
        },
        {
            question: "What is Chandlers boss' wife's name?",
            answers: ['Jenny', 'Kara', 'Petra', 'Lisa'],
            correct: 'Kara',
            images: ["assets/images/friends-trivia03.jpg"]
        },
        {
            question: "What was the name of Phoebe's ex who ate chalk?",
            answers: ['Chris', 'Luke', 'Carl', 'Matt'],
            correct: 'Carl',
            images: ["assets/images/friends-trivia04.jpg"]
        },
        {
            question: "According to Ross in 'The One With The Cop', how many times did he and Rachel do it?",
            answers: ['298', '189', '302', '246'],
            correct: '298',
            images: ["assets/images/friends-trivia05.jpg"]
        },
        {
            question: "How many episodes does Mike appear in through out the series?",
            answers: ['34', '28', '18', '15'],
            correct: '18',
            images: ["assets/images/friends-trivia06.jpg"]
        },
        {
            question: "In which episode does Joey explain what a 'moo point' is?",
            answers: ['The One with Monicas Thunder', 'The One with All the Candy', 'The One Where Rosita Dies', 'The One Where Chandler Doesnt Like Dogs'],
            correct: 'The One Where Chandler Doesnt Like Dogs',
            images: ["assets/images/friends-trivia07.jpg"]
        },
        {
            question: "In the episode where Joey competes with a fellow cologne spitzer, what is his nemesises name?",
            answers: ['The Cowboy', 'The Hombre Man', 'The Cologne Master', 'Fellow Cologne'],
            correct: 'The Hombre Man',
            images: ["assets/images/friends-trivia08.jpg"]
        },
        {
            question: "Which of these is Ross not allergic to?",
            answers: ['Lobster','Peanuts','Kiwi','Dust'],
            correct: 'Dust',
            images: ["assets/images/friends-trivia09.jpg"]
        }
    ];


    function startGame() {

        if (!clockRunning) {
            clearInterval(displayNextQuestion);
            clearInterval(imageTime);


            clockRunning = true;
            timeRemaining = 40;
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
        if (userChoice === quotes[0].correct) {
            correctAnswer++
            questionsField.innerText = "You are correct! The answer was " + "" + userChoice +""
            showImage()
            console.log("correct choice")
        } else {
            incorrectAnswer++
            questionsField.innerText = "Incorrect! The correct answer was " + "" + quotes[0].correct + ""
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
        $(answerPicture).attr("src", quotes[0].images[0]).addClass("image-display")
        answerPicture.appendTo("#questions")

        if (answerPicked === false) {
            questionsField.innerText = "You ran out of time, make sure you pick an answer next time"
            answerField.innerText = "The correct answer was " + quotes[0].correct
            incorrectAnswer++

        }
        // incorrectAnswerDisplay.innerText = incorrectAnswer
        // correctAnswerDisplay.innerText = correctAnswer

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
        correctAnswerDisplay.innerText = correctAnswer

        questionsField.innerText = ""
        answerField.innerText = ""
        quotes.shift();
        // clearInterval(intervalTime);
        console.log(quotes)

        if (quotes.length > 0) {
            startGame()
        } else {
            console.log("Game Over")
            $("#game").hide();
            $("#stat-screen").show();
        }
    }

    function restartGame() {
        quotes = [{
            question: 'Whats the first word uttered in the first ever episode of Friends?',
            answers: ['Theres', 'Come', 'So', 'Its'],
            correct: 'Theres',
            images: ["assets/images/friends-trivia01.jpg"]
        },
        {
            question: "Which of these is never a message on Joey and Chandlers doodle board?",
            answers: ['Clean up the duck feathers in the hallway!', 'Whats up bro?', 'Thanks for all your stuff', 'Joey - call your mom'],
            correct: 'Joey - call your mom',
            images: ["assets/images/friends-trivia02.jpg"]
        },
        {
            question: "What is Chandlers boss' wife's name?",
            answers: ['Jenny', 'Kara', 'Petra', 'Lisa'],
            correct: 'Kara',
            images: ["assets/images/friends-trivia03.jpg"]
        },
        {
            question: "What was the name of Phoebe's ex who ate chalk?",
            answers: ['Chris', 'Luke', 'Carl', 'Matt'],
            correct: 'Carl',
            images: ["assets/images/friends-trivia04.jpg"]
        },
        {
            question: "According to Ross in 'The One With The Cop', how many times did he and Rachel do it?",
            answers: ['298', '189', '302', '246'],
            correct: '298',
            images: ["assets/images/friends-trivia05.jpg"]
        },
        {
            question: "How many episodes does Mike appear in through out the series?",
            answers: ['34', '28', '18', '15'],
            correct: '18',
            images: ["assets/images/friends-trivia06.jpg"]
        },
        {
            question: "In which episode does Joey explain what a 'moo point' is?",
            answers: ['The One with Monicas Thunder', 'The One with All the Candy', 'The One Where Rosita Dies', 'The One Where Chandler Doesnt Like Dogs'],
            correct: 'The One Where Chandler Doesnt Like Dogs',
            images: ["assets/images/friends-trivia07.jpg"]
        },
        {
            question: "In the episode where Joey competes with a fellow cologne spitzer, what is his nemesises name?",
            answers: ['The Cowboy', 'The Hombre Man', 'The Cologne Master', 'Fellow Cologne'],
            correct: 'The Hombre Man',
            images: ["assets/images/friends-trivia08.jpg"]
        },
        {
            question: "Which of these is Ross not allergic to?",
            answers: ['Lobster','Peanuts','Kiwi','Dust'],
            correct: 'Dust',
            images: ["assets/images/friends-trivia09.jpg"]
        }
    ];

        correctAnswer = 0;
        incorrectAnswer = 0;
        incorrectAnswerDisplay.innerText = incorrectAnswer
        correctAnswerDisplay.innerText = correctAnswer
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

        function displayImage() {
            $("#main-picture").html("<img src=" + images[imageCount] + " height='400px' width='500px'>");
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
    }
    startSlideshow()

})