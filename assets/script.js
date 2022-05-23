// start button content
var mainEl = $("#container");
var startButtonEl = $("<button>");
var timerEl = $("#timer");
var quizEl = $("#quiz");
var resultsEl = $("#results");
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
			"Refers to the object that 'this' this a property of",
			"Refers to all local variables",
			"Refers to what is directly above it",
		],
		answer: "Refers to the object that 'this' this a property of",
	},
	{
		question: "Which of the following is not a way to get user input?",
		options: ["Prompt", "Alert", "Confirm", "Ask"],
		answer: "Ask",
	},
];
let index = 0;
startButtonEl.text("Start");
startButtonEl.attr("id", "start");
mainEl.append(startButtonEl);
startButtonEl.on("click", function () {
	startButtonEl.attr("id", "remove-display");
	questions();
	timerEl.append("Time Remaining: ");
	timeInterval();
});

function timeInterval() {
	let timer = 10;
	let spanEl = $("<span></span>");
	let interval = setInterval(function () {
		if (timer === 0) {
			index++;
			questions();
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
	questionDiv.html(questionsOptions[index].question);
	mainEl.append(questionDiv);
	let unorderedList = $("<ul> </ul>");
	for (let i = 0; i < questionsOptions[index].options.length; i++) {
		let listItem = $(`<li onclick = optionClicked(event)>  </li>`);
		listItem.html(questionsOptions[index].options[i]);
		unorderedList.append(listItem);
		// only goes through the first two questions because the timer runs out, not sure how to make it go to the next question after 10s, then reset the timer for another 10s
	}
	mainEl.append(unorderedList);
}

score = 0;

function optionClicked(event) {
	console.log(event.target.innerHTML);
	let feedback = $("<div> </div>");
	if (event.target.innerHTML === questionsOptions[index].answer) {
		feedback.attr("id", "correct");
		feedback.html("That is the correct answer");
		localStorage.setItem("Score: ", ++score);
		// issue with the score adding multiple times still exists
	} else {
		feedback.attr("id", "incorrect");
		feedback.html("That is the incorrect answer");
	}
	quizEl.children().remove();
	quizEl.append(feedback);
}
// write results function here (waiting cause i am not sure how to make it go to results yet with the timer not working right rn)
function results() {}

// after timer runs out on final question, got to results page with final score, allow user to add initials, then log it to the userStorage
