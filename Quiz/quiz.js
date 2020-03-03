var questions = [{
	question: 'Which actor is the lead singer of a famous American band “30 Seconds to Mars”?',
	answers: ['Keanu Reeves', 'Jared Leto', 'Chris Hemsworth', 'Pierce Brosnan'],
	correctAnswer: 'Jared Leto',
},
{
	question: 'Which actor played the role of a Russian boxer, Ivan Drago, in “Rocky 4”?',
	answers: ['Denzel Washington', 'Daniel Day-Lewis', 'Dolph Lundgren', 'Elijah Wood'],
	correctAnswer: 'Dolph Lundgren',
},
{
	question: 'Which actor played James Bond in 1990?',
	answers: ['Hugh Jackman', 'Chuck Norris', 'Robert Pattinson', 'Pierce Brosnan'],
	correctAnswer: 'Pierce Brosnan',
},
{
	question: 'Who played Wolverine?',
	answers: ['Vinnie Jones', 'Hugh Jackman', 'Nicholas Cage', 'Pierce Brosnan'],
	correctAnswer: 'Hugh Jackman',
},
{
	question: 'Which actor was awarded Oscars for the films “Glory” and “Training Day”?',
	answers: ['Anthony Hopkins', 'Daniel Day-Lewis', 'Nicholas Cage', 'Denzel Washington'],
	correctAnswer: 'Denzel Washington',
},
{
	question: 'Marilyn Manson’s real first name?',
	answers: ['Jared', 'Jhon', 'Bryan', 'Mike'],
	correctAnswer: 'Bryan',
},
{
	question: 'Which actor played the role of a famous fictional serial killer Hannibal Lecter?',
	answers: ['Daniel Day-Lewis', 'Anthony Hopkins', 'Nicholas Cage', 'Elijah Wood'],
	correctAnswer: 'Anthony Hopkins',
},
{
	question: 'Which actor used to be a professional soccer player?',
	answers: ['Vinnie Jones', 'Robert Pattinson', 'Nicholas Cage', 'Chuck Norris'],
	correctAnswer: 'Vinnie Jones',
},
{
	question: 'Which actor appeared in famous films, such as “Gone in 60 Seconds”, “Face/Off”, “Ghost Rider".',
	answers: ['Nicholas Cage', 'Robert Pattinson', 'Pierce Brosnan', 'Hugh Jackman'],
	correctAnswer: 'Nicholas Cage',
},
{
	question: '	Which actor traveled with the circus at the age of 15 and was a tamer??',
	answers: ['Dolph Lundgren', 'Anthony Hopkins', 'Chuck Norris', 'Jared Leto'],
	correctAnswer: 'Chuck Norris',
}];


var target = document.querySelector('.quiz');

var myQuiz = new Quiz(target, questions);

function Quiz (target, data) {
	
	var correctAnswer = data[0].correctAnswer;
	var count = 30;
	var current = 0;
	var quizStarted = false;
	var buttonDisabled = true;
	var interval;

	function init () {
		formatHtml();
		clickEvents();
	}


	function formatHtml () {
		var customHtml =   '<div class="timer">'+ count +'</div>' +
						   '<div class="quiz_wrapper">' + 
							   '<div class="quiz_display">' + data[current].question + '</div>' +
							   '<div class="buttons_wrapper">';

		for( var i = 0; i < data[current].answers.length; i++) {
			customHtml = customHtml + '<div class="button" data-value="' + data[current].answers[i] + '">' + data[current].answers[i] + '</div>';
		}

		customHtml = customHtml +					   	
							   '</div>' +
							'</div>' +
							'<div class="start_quiz">Start Quiz</div>';

		target.innerHTML = customHtml;
	}

	function clickEvents () {
		var buttons = target.querySelectorAll('.button');
		for (var i = 0; i < buttons.length; i++) {
			buttons[i].addEventListener('click', function (){
				if(count == 0 || buttonDisabled == true) return;

				if (correctAnswer == this.getAttribute('data-value')) {
					this.classList.add('right');
					buttonDisabled = true;
					clearInterval(interval);
					if (current == data.length - 1) {
						alert('Congratulations, you did it.')
					}
					else {
						count = 5;
						var timer = target.querySelector('.timer');
						timer.innerHTML = count;
						timer.style.backgroundColor = '#1dd1a1';
						interval = setInterval(function () {
							count--; 
							timer.innerHTML = count;
							if (count == 0) {
								clearInterval(interval);
								current++;
								correctAnswer = data[current].correctAnswer;
								count = 30;
								buttonDisabled = false;
								formatHtml();
								initCounter();
								clickEvents();
							}
						} ,1000);
					}
				}

				else {
					this.classList.add('wrong');
					target.querySelector('.button[data-value="' + correctAnswer + '"]').classList.add('correct');
					buttonDisabled = true;
					clearInterval(interval);
					var timer = target.querySelector('.timer');
					timer.style.backgroundColor = '#ee5253';
					alert('Game is over, thank you for playing');

				}
			});
		}

		var startQuiz = target.querySelector('.start_quiz');
		startQuiz.addEventListener('click', function () {
			if (quizStarted == false) {
				buttonDisabled = false;
				initCounter();
				quizStarted = true;
			}
		});
	}


	function initCounter () {
		interval = setInterval( function () {
			var selector = target.querySelector('.timer');
			count--;
			selector.innerHTML = count;
			if ( count == 0) {
				selector.style.backgroundColor = '#ee5253';
				clearInterval(interval);
				target.querySelector('.button[data-value="' + correctAnswer + '"]').classList.add('correct');
				alert('you wasted you\'re time');
			}
			else if (count <= 10) {
				selector.style.backgroundColor = '#ff9f43';
			}

		}, 1000);
	}


	init();
}

