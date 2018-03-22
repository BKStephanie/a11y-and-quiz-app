let questionCount = 1;
let numCorrect = 0;
let test = 1;
let currentPage = 0;

const trivia = [
	{
		question: 'Billie Holiday was the babysitter for which future celebrity?',
		ans: {
			a: 'Billy Crystal',
			b: 'Bob Barker',
			c: 'Tina Turner',
			d: 'Gilda Radner',
		},
		correctAnswer: 'a',
		src:
			'https://upload.wikimedia.org/wikipedia/commons/thumb/1/12/Billie_Holiday_0001_original.jpg/465px-Billie_Holiday_0001_original.jpg',
	},
	{
		question: 'He was allergic to carrots. He also voiced Bugs Bunny.',
		ans: {
			a: 'Richard Little',
			b: 'Mel Blanc',
			c: 'Charles Fleischer',
			d: 'Christopher Lloyd',
		},
		correctAnswer: 'b',
		src: 'https://media.giphy.com/media/M53JeqevLLNK0/giphy.gif',
	},

	{
		question:
			'Which Alfred Hitchcock film features a flushing toilet for the first time?',
		ans: {
			a: 'The Birds',
			b: 'Rear Window',
			c: 'Vertigo',
			d: 'Psycho',
		},
		correctAnswer: 'd',
		src: 'https://media.giphy.com/media/26BRv5nstnnBUAxeo/giphy.gif',
	},
	{
		question: 'What brand of beer did ET drink?',
		ans: {
			a: 'Bud Light',
			b: 'Coors',
			c: 'Miller',
			d: 'Old Milwaukee',
		},
		correctAnswer: 'b',
		src: 'https://media.giphy.com/media/14jRWmyHsokyOY/giphy.gif',
	},
	{
		question: 'What is the fear of being buried alive called?',
		ans: {
			a: 'Acrophobia',
			b: 'Cynophobia',
			c: 'Daviphobia',
			d: 'Taphophobia',
		},
		correctAnswer: 'd',
		src:
			'https://static.fjcdn.com/gifs/Buried+alive+its+from+the+1980s+movie+parents_dd1dad_5031448.gif',
	},
];

function incrementQuestionNumber() {
	questionCount++;
	$('.counter').html(`Question ${questionCount} out of five`);
}

function buildQuiz() {
	const output = [];

	$('.page').html(
		'Five arbitrary questions at your disposal. Press the start button to begin.'
	);

	trivia.forEach((currentQuestion, questionNumber) => {
		const ans = [];

		ans.push(`<fieldset>`);
		for (let option in currentQuestion.ans) {
			ans.push(
				`<label>
           <input type="radio" id="myRadio" name="question${questionNumber +
							1}" value="${option}" required>
            ${currentQuestion.ans[option]}
         </label>`
			);
		}
		ans.push(`</fieldset>`);

		const correctKey = currentQuestion.correctAnswer;

		output.push(
			`
        <div class="page">
          <legend class="question"> ${currentQuestion.question} </legend>
          <label class="answers"> ${ans.join('')}</label>
        </div>
        <div class="page">
          <div class="feedback-page${questionNumber + 1}">${currentQuestion.ans[
				correctKey
			]}</div>
        </div>
      `
		);
	});

	$('.counter').html(`Question ${questionCount} out of 5`);
	quizContainer.innerHTML = output.join('');
}

function incrementQuestionNumber() {
	questionCount++;
	$('.counter').html(`Question ${questionCount} out of 5`);
}

function showPage(n) {
	const nextButton = document.getElementById('next');
	const pages = $('.page');
	const bgImg = $('form').css({ backgroundImage: `url(${trivia.src})` });
	pages[currentPage].classList.remove('active-page');
	pages[n].classList.add('active-page');
	currentPage = n;

	if (currentPage === 0) {
		startButton.style.display = 'inline-block';
		nextButton.style.display = 'none';
		submitAnswer.style.display = 'none';
	} else {
		startButton.style.display = 'none';
	}
	if (currentPage === pages.length - 1) {
		nextButton.style.display = 'none';
		submitButton.style.display = 'inline-block';
	} else {
		nextButton.style.display = 'inline-block';
		submitAnswer.style.display = 'inline-block';
		submitButton.style.display = 'none';
		restartButton.style.display = 'none';
	}
}

function showNextPage() {
	showPage(currentPage + 1);
}

const quizContainer = document.getElementById('quiz');
const resultsContainer = document.getElementById('results');
const submitButton = document.getElementById('submit');

// display quiz right away
buildQuiz();

const restartButton = document.getElementById('restart');
const startButton = document.getElementById('start');
const nextButton = document.getElementById('next');
const submitAnswer = document.getElementById('submitAnswer');
const pages = $('.page');

showPage(0);
$(nextButton).hide();
$('.counter').hide();
$(submitAnswer).hide();
$('.score').hide();

$('#restart').click(event => {
	event.preventDefault();
	location.reload();
});

$('#submit').click(event => {
	event.preventDefault();
	$('#submit').hide();
	$('.score').hide();
	$(restartButton).show();

	quizContainer.innerHTML = `You have answered ${numCorrect} out of ${trivia.length} questions correctly`;
});

$('#start').click(event => {
	event.preventDefault();
	showNextPage();
	$('.counter').show();
	$(nextButton).hide();
	$('form').css(
		'background-image',
		'url(' + trivia[questionCount - 1].src + ')'
	);
});

$(nextButton).click(event => {
	event.preventDefault();
	showNextPage();
	incrementQuestionNumber();
	$('.counter').show();
	$(submitAnswer).show();
	$(nextButton).hide();
	$('form').css(
		'background-image',
		'url(' + trivia[questionCount - 1].src + ')'
	);
});

function submit(event) {
	event.preventDefault();
	$('.score').show();
	let userInput = `input[name=question${questionCount}]:checked`;
	userInput = $(userInput).val();
	let triviaIndex = questionCount - 1;
	let correctAnswer = trivia[triviaIndex].correctAnswer;

	if (!userInput) {
		alert('Nothing is checked!');
		return false;
	}
	if (userInput === correctAnswer) {
		$(`.feedback-page${questionCount}`).html('Correct!');
		numCorrect++;
	} else {
		$(`.feedback-page${questionCount}`).html(
			`Nope. The correct answer is ${trivia[triviaIndex].ans[correctAnswer]}.`
		);
	}
	if (questionCount <= trivia.length) {
		$('.score').html(`Current Score: ${numCorrect} out of 5 possible points`);
	} else {
		$('.score').html('');
	}

	showNextPage();
	$('.counter').hide();
	$(submitAnswer).hide();
}

$(submitAnswer).click(submit);

$(document).keypress(event => {
	event.preventDefault();
	$('button:visible').click();
});
