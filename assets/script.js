// start button content
var mainEl = $("#container");
var startButtonEl = $("<button>");
var timerEl = $("#timer");
var quizEl = $("#quiz");
var resultsEl = $("#results");
var feedbackEl = $("#feedback");
var highScoreEl = $("#high-score-input");
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
// sets timer to 30 seconds
let timer = 30;
function timeInterval() {
	let spanEl = $("<span></span>");
	let interval = setInterval(function () {
		if (timer > 0) {
			questions();
			// right now this will just clear the page right when index = 5, doesnt take the user to the score area
			if (index === 5) {
				endGame();
			}
		} else {
			mainEl.children().remove();
			feedbackEl.children().remove();
			scoreArea();
			clearInterval(interval);
		}
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
	return;
}

score = 0;
function optionClicked(event) {
	console.log(event.target.innerHTML);
	let feedback = $("<div> </div>");
	// for the option clicked, if it is correct it pops up that the user is correct, adds to the score, and index's the user up one
	if (event.target.innerHTML === questionsOptions[index].answer) {
		feedback.attr("id", "correct");
		feedback.html("That is the correct answer");
		localStorage.setItem("Score: ", ++score);
		// removing the if statement allows you to index to 5 but breaks everything else, need to find a way to index to five somehow still

		// if the user is incorrect it tells the user they are incorrect and removes 5 seconds from the timer
	} else {
		feedback.attr("id", "incorrect");
		feedback.html("That is the incorrect answer");
		timer -= 5;
	}

	index++;

	// removes the previous question and it's feedback from the page
	quizEl.children().remove();
	feedbackEl.children().remove();
	feedbackEl.append(feedback);
	questions();
}

function endGame() {
	quizEl.children().remove();
	feedbackEl.children().remove();
	// need to do this somewhere else cause it always logs 28
	// localStorage.setItem("Time Remaining", timer);
	scoreArea();
	clearInterval(interval);
}

function scoreArea() {
	let resultsDiv = $("<div> </div>");
	let timerScore = localStorage.getItem("Time Remaining: ");
	// i can log and can see in the local storage this variable, but i cant get it to show up on the page
	console.log(timerScore);
	// i cant get anything to show up to the right of the time remaining
	resultsDiv.text("Time Remaining (score): ", timerScore);
	let setHighScore = $("<input type='text'>");
	let highScoreButton = $("<input type='submit'>");
	let highScoreDiv = $("<div>");
	let highScoreContent = $("<div>");
	highScoreDiv.text("Enter your initials below to add your high score!");
	highScoreButton.text("Submit");
	// function needs to be written to add high score to list
	highScoreButton.on("click", function () {
		highScoreList();
	});

	resultsEl.append(resultsDiv);
	resultsDiv.append(highScoreDiv);
	resultsEl.append(highScoreEl);
	highScoreEl.append(setHighScore);
	highScoreEl.append(highScoreButton);
}

function highScoreList() {
	resultsEl.children().remove();
	highScoreEl.children().remove();
}

// score area must display your score, the top 3 high scores. must also allow you to store your score alongside your initials.
