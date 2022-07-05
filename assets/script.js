// main DOM elements
var bodyEl = $("#body");
var mainEl = $("#container");
var startButtonEl = $("<button>");
var timerEl = $("#timer");
var quizEl = $("#quiz");
var resultsEl = $("#results");
var feedbackEl = $("#feedback");
var highScoreEl = $("#high-score-input");
highScoreStorage = JSON.parse(localStorage.getItem("Score")) || [];
let scoreListEl = $("#scoreList");
let scoreHeaderEl = $("#scoreHeader");
// the five questions used in the quiz
const questionsOptions = [
	{
		question: "What typecase do we use in JavaScript?",
		options: ["Snake case", "Camel case", "All capitals", "All lower case"],
		answer: "Camel case",
	},
	{
		question: "What do you use to create an array?",
		options: [
			"( Parentheses )",
			"{ Curly Braces }",
			"[ Brackets ]",
			"' Single Quotes '",
		],
		answer: "[ Brackets ]",
	},
	{
		question: "What is the difference between '==' and '==='?",
		options: [
			"Double == compares the value, and triple === compares the value and type",
			"Triple === compares the value only",
			"Nothing, they are the same",
			"Double == compares the types only",
		],
		answer:
			"Double == compares the value, and triple === compares the value and type",
	},
	{
		question: "What does 'this' refer to?",
		options: [
			"Refers to global variables",
			"Refers to the object that 'this' is a property of",
			"Refers to all local variables",
			"Refers to what is directly above it",
		],
		answer: "Refers to the object that 'this' is a property of",
	},
	{
		question: "Which of the following is not a way to get user input?",
		options: ["Prompt", "Alert", "Confirm", "Ask"],
		answer: "Ask",
	},
];
// setting index to 0 for the questions
let index = 0;
// code to generate start button for the start button
startButtonEl.text("Start");
startButtonEl.attr("id", "start");
mainEl.append(startButtonEl);
// function that on click removes the start button from the page, starts the questions and the timer
startButtonEl.on("click", function () {
	startButtonEl.attr("id", "remove-display");
	questions();
	timerEl.append("Time Remaining: ");
	timeInterval();
});
let timer = 30;
function timeInterval() {
	let spanEl = $("<span></span>");
	let interval = setInterval(function () {
		// keeps asking questions as long as the timer is >0 and index is <=4
		if (timer > 0 && index <= 4) {
			questions();
			// calls the end game function once index = 5 (all questions asked)
			if (index === 5) {
				endGame();
			}
			// same as the end game function, but triggers when the timer runs out
		} else {
			mainEl.children().remove();
			feedbackEl.children().remove();
			timerEl.children().remove();
			scoreArea();
			clearInterval(interval);
		}
		// appends the timer info onto the page
		spanEl.html(timer);
		timerEl.append(spanEl);
		timer--;
	}, 1000);
}

function questions() {
	mainEl.children().remove();
	quizEl.children().remove();
	let questionDiv = $("<div>  </div>");
	// puts the question onto the page based on the index that the user is on
	if (index < 5) {
		questionDiv.text(questionsOptions[index].question);
		mainEl.append(questionDiv);
		let unorderedList = $("<ul> </ul>");
		// puts the question options into li's and puts them onto the page
		for (let i = 0; i < questionsOptions[index].options.length; i++) {
			let listItem = $(`<li onclick = optionClicked(event)>  </li>`);
			listItem.html(questionsOptions[index].options[i]);
			unorderedList.append(listItem);
		}
		mainEl.append(unorderedList);
	}
}

score = 0;
function optionClicked(event) {
	console.log(event.target.innerHTML);
	let feedback = $("<div> </div>");
	// for the option clicked, if it is correct it pops up that the user is correct
	if (event.target.innerHTML === questionsOptions[index].answer) {
		feedback.attr("id", "correct");
		feedback.html("That is the correct answer");
		// if the user is incorrect it tells the user they are incorrect and removes 5 seconds from the timer
	} else {
		feedback.attr("id", "incorrect");
		feedback.html("That is the incorrect answer");
		timer -= 5;
	}
	// moves the user up one in the index per answer click
	index++;
	// removes the previous question and it's feedback from the page
	quizEl.children().remove();
	feedbackEl.children().remove();
	feedbackEl.append(feedback);
	questions();
}

// switches the user into the score area and removes all parts of the quiz on the screen
function endGame() {
	bodyEl.children().remove();
	clearInterval(interval);
	scoreArea();
}

// this function generates the area for the user to input their name to add their score to the high score list
function scoreArea() {
	// base stuff to generate buttons and text field for submitting user info
	let resultsDiv = $("<div> </div>");
	let setScoreName = $("<input type='text'>");
	let highScoreButton = $("<input type='submit'>");
	let highScoreDiv = $("<div>");
	highScoreDiv.text("Enter your initials below to add your high score!");
	// on click adds the users entered name and their score (timer), to the highScoreStorage
	highScoreButton.on("click", function (event) {
		event.preventDefault();
		let userSubmit = {
			name: setScoreName.val(),
			score: timer,
		};
		highScoreStorage.push(userSubmit);
		// sets the score into the local storage
		localStorage.setItem("Score", JSON.stringify(highScoreStorage));
		highScoreList();
	});
	// appends all of theses elements so that the page generates
	resultsEl.append(resultsDiv);
	resultsDiv.append(highScoreDiv);
	resultsEl.append(highScoreEl);
	highScoreEl.append(setScoreName);
	highScoreEl.append(highScoreButton);
}

function highScoreList() {
	resultsEl.children().remove();
	highScoreEl.children().remove();
	let scoreHeader = $("<h3></h3>");
	scoreHeader.text("High Score List");
	scoreHeaderEl.append(scoreHeader);
	scoreHeader.append(scoreListEl);
	scoreListEl.empty();

	highScoreStorage.sort(function (a, b) {
		return parseFloat(b.score) - parseFloat(a.score);
	});

	if (highScoreStorage.length > 0) {
		for (let i = 0; i < 5; i++) {
			if (i < highScoreStorage.length) {
				let highScoreItem = highScoreStorage[i];
				$("#scoreList").append(
					$("<li>").text(
						i + 1 + ". " + highScoreItem.name + " - " + highScoreItem.score
					)
				);
			}
		}
	}
}
