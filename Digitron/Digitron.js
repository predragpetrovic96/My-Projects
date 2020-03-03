(function($){
	var result = 0;
	var currentValue = 0;
	var operator = '';
	var lastClicked ='';
	var numbers = ['0','1','2','3','4','5','6','7','8','9'];
	var showDot = false;
	var decNumber = 0.1;
	var decCount = 0;
	var history = [];
	var gradients = ['radial-gradient( circle farthest-corner at 0.5% 3%, rgba(98,50,122,1) 0%, rgba(56,0,92,1) 90.1% )',
	'radial-gradient( circle farthest-corner at -3.1% -4.3%,  rgba(57,255,186,1) 0%, rgba(21,38,82,1) 90% )',
	'linear-gradient( 109.6deg,  rgba(0,0,0,1) 11.2%, rgba(247,30,30,1) 100.3% )',
	'linear-gradient( 109.6deg,  rgba(0,182,255,1) 11.2%, rgba(102,51,153,1) 91.1% )',
	'radial-gradient( circle farthest-corner at 6.6% 12%,  rgba(64,0,126,1) 20.8%, rgba(0,255,160,1) 100.2% )',
	'radial-gradient( circle farthest-corner at 10.6% 22.1%,  rgba(206,18,18,1) 0%, rgba(122,21,21,1) 100.7% )',
	'radial-gradient( circle farthest-corner at 1.5% 2.8%,  rgba(69,237,244,1) 23.2%, rgba(26,243,158,1) 45%, rgba(241,78,163,1) 93.1% )',
	'linear-gradient( 288.4deg,  rgba(88,129,1,1) 33.9%, rgba(208,253,114,1) 93.4% )',
	'linear-gradient( 76.5deg,  rgba(8,235,254,0.72) 8.2%, rgba(243,237,17,1) 90.8% )',
	'linear-gradient( 135.8deg,  rgba(26,26,29,1) 27.1%, rgba(111,34,50,1) 77.5% )',
	'linear-gradient( 113.1deg,  rgba(254,140,48,1) 14%, rgba(253,75,101,1) 80.5%, rgba(255,53,109,1) 100.6% )',
	'linear-gradient( 109.6deg,  rgba(8,8,247,0.91) 12.7%, rgba(250,5,5,0.91) 92.2% )',
	'radial-gradient( circle farthest-corner at 9.2% 43.4%,  rgba(0,0,0,1) 0%, rgba(175,0,123,1) 100.2% )',
	'linear-gradient( 109.6deg,  rgba(13,40,32,1) 11.2%, rgba(41,204,126,1) 100.2% )',
	'radial-gradient( circle 780px at 37.8% 100.3%,  rgba(19,55,115,1) 2.2%, rgba(32,7,80,1) 20.2%, rgba(27,88,111,1) 58.6%, rgba(115,88,44,1) 75%, rgba(99,19,90,1) 89.6%, rgba(12,51,76,1) 96.1% )',
	'radial-gradient( circle farthest-corner at 51% 51.5%,  rgba(237,69,69,0.91) 0.1%, rgba(170,20,20,1) 90% )',
	'linear-gradient( 114.3deg,  rgba(19,126,57,1) 0.2%, rgba(8,65,91,1) 68.5% )',
	'linear-gradient( 179.9deg,  rgba(161,89,0,1) 6.5%, rgba(75,41,0,1) 102.7% )',
	'linear-gradient( 179.2deg,  rgba(21,21,212,1) 0.9%, rgba(53,220,243,1) 95.5% )',
	'radial-gradient( circle farthest-corner at 10% 20%,  rgba(6,0,1,1) 0%, rgba(255,208,97,1) 90% )',
	'radial-gradient( circle farthest-corner at 8.3% 46.3%,  rgba(98,71,49,1) 0%, rgba(199,136,91,1) 100.2% )',
	'linear-gradient( 113.7deg,  rgba(90,173,173,1) 16.4%, rgba(0,0,0,1) 99.7% )',
	'radial-gradient( circle farthest-corner at 11.9% 17%,  rgba(73,96,108,1) 0%, rgba(62,80,89,1) 90% )',
	'radial-gradient( circle farthest-corner at 97.4% 91.4%,  rgba(204,0,107,1) 0%, rgba(0,0,0,1) 82.4% )',
	'radial-gradient( circle farthest-corner at 48.4% 47.5%,  rgba(76,21,51,1) 0%, rgba(34,10,37,1) 90% )',
	'radial-gradient( circle 964.7px at 10% 20%,  rgba(0,0,0,1) 0%, rgba(46,52,79,1) 44%, rgba(187,187,187,1) 100.1% )',
	'linear-gradient( 88.2deg,  rgba(255,244,27,1) -2.2%, rgba(169,17,146,1) 104.2% )',
	'linear-gradient( 109.6deg,  rgba(0,0,0,0.93) 11.2%, rgba(63,61,61,1) 78.9% )',
	'linear-gradient( 109.6deg,  rgba(158,16,16,1) 11.2%, rgba(242,153,153,1) 91.1% )',
	'linear-gradient( 291.2deg,  rgba(255,114,245,1) 32.5%, rgba(204,40,193,1) 100.2% )'];
	var index = 1;
	$(document).ready(function(){
		var pressMe = document.querySelector('.press_me');
		pressMe.addEventListener('click',changeGradient);
		$('.button, .number').click(function(e){
			var value = $(this).attr('data-value');
			/* ovde ide kod za click: */
			if (numbers.includes(value)) {
				var currentNumber = parseInt(value);
				if (showDot) {
					currentValue = currentValue + decNumber*currentNumber;
					decNumber = decNumber*0.1;
					decCount++;
					currentValue = Math.round(currentValue * Math.pow(10,decCount)) / Math.pow(10,decCount);
				}
				else {
					currentValue = currentValue * 10 + currentNumber;
				}
				showResult(currentValue, decCount);
				showHistory(value);
			}
			else if (value == 'bs') {
				if (showDot) {
					if (currentValue % 1 == 0) {
						showDot = false;
					}
					else {
						decNumber = decNumber/0.1;
						decCount--;
						// ex: currentValue = 55.34; decNumber = 0.01; decCount = 1;
						currentValue = currentValue * 1/decNumber; // 55.34 * 100 => 5534
						currentValue = currentValue / 10; // 5534 / 10 => 553.4
						currentValue = Math.floor(currentValue); // 553
						currentValue *= decNumber*10; // 553 * 0.01 * 10 => 55.3
						currentValue = Math.round(currentValue * Math.pow(10,decCount)) / Math.pow(10,decCount);

					}
				}
				else {
					currentValue = currentValue / 10;
					currentValue = Math.floor(currentValue);
				}
				showResult(currentValue, decCount);
				showHistory(value);
			}
			else if (value == '+') {
				doTheMath();
				currentValue = 0;
				decNumber = 0.1;
				decCount = 0;
				operator = '+';
				showResult(result);
				showHistory(value);
				
			}
			else if (value == '-') {
				doTheMath();
				currentValue = 0;
				decNumber = 0.1;
				decCount = 0;
				operator = '-';
				showResult(result);
				showHistory(value);
			}
			else if (value == 'x'){
				doTheMath();
				currentValue = 0;
				decNumber = 0.1;
				decCount = 0;
				operator = 'x';
				showResult(result);
				showHistory(value);
			}
			else if(value == '/') {
				doTheMath();
				currentValue = 0;
				decNumber = 0.1;
				decCount = 0;
				operator = '/';
				showResult(result);
				showHistory(value);
			}
			else if (value == 'ce'){
				currentValue = 0;
				decNumber = 0.1;
				decCount = 0;
				showDot = false;
				showResult(currentValue);
				showHistory(value);
			}
			else if (value == 'c'){
				result = 0;
				currentValue = 0;
				decNumber = 0.1;
				decCount = 0;
				operator = '';
				lastClicked ='';
				showDot = false;
				showResult(result);
				showHistory(value);
			}
			else if (value == '=') {
				doTheMath();
				showResult(result);
				showHistory(value);
				result = 0;
				currentValue = 0;
				decNumber = 0.1;
				decCount = 0;
				operator = '';
				lastClicked ='';
				showDot = false;
				history = [];
			}
			else if (value == '+/-') {
				currentValue = -currentValue;
				showResult(currentValue);
				showHistory(value);
			}
			else if (value == '.') {
				showDot = true;
				showResult(currentValue);
			}
			lastClicked = value;
			
		});

		$('.result').html(result);
	});

	/* Ovde definises funkcije: */
	Number.prototype.format = function(n, x) {
	    var re = '\\d(?=(\\d{' + (x || 3) + '})+' + (n > 0 ? '\\.' : '$') + ')';
	    return this.toFixed(Math.max(0, ~~n)).replace(new RegExp(re, 'g'), '$&,');
	};
	/*
	function changeGradient () {
		var colorBody = document.querySelector('.color_body');
		var random = Math.floor(Math.random()*gradients.length);
		colorBody.style.backgroundImage = gradients[random];
	};
	*/

	function changeGradient () {
		var colorBody = document.querySelector('.color_body');
		index = index + 1;
		if (index == gradients.length) {
			index = 0;
		};
		colorBody.style.backgroundImage = gradients[index];
	};

	function showResult(res,count){
		var intPart = parseInt(res);
		var floatPart;
		var floatPartArray = String(res).split(".");

		if(typeof floatPartArray[1] != 'undefined' && floatPartArray[1]) {
			if(typeof count != 'undefined') {
				floatPart = '.'+Math.round(floatPartArray[1]/Math.pow(10,floatPartArray[1].toString().length-count));
				floatPart = floatPart.substr(0,count+1);
			}
			else {
				floatPart = '.'+floatPartArray[1];
			}
		}
		else {
			floatPart = '';
		}

		if (showDot && floatPart.indexOf('.') == -1) {
			floatPart = '.';
		}
		$('.result').html(intPart.format() + floatPart);
	};
	function showHistory(button){	
		if (button == '+' || button == '-' || button == 'x' || button == '/') {
			var lastElement = history[history.length-1];
			if(typeof lastElement == 'undefined') {
				history[0] = 0;
				history[1] = button;
			}
			else if (lastElement == '+' || lastElement == '-' || lastElement == 'x' || lastElement == '/') {
				history[history.length-1] = button;
			}
			else {
				history[history.length] = button;
			}
			$('.history').html(history.join(' '));		
		}
		else if (numbers.includes(button) || button == 'bs' || button == 'ce' || button == '+/-') {
			var lastElement = history[history.length-1]; 
			if (typeof lastElement != 'undefined' && lastElement != '+' && lastElement != '-' && lastElement != 'x' && lastElement != '/') {
				history[history.length-1] = currentValue;
			}
			else {
				history[history.length] = currentValue;
			}
		}
		else if (button == 'c') {
			history = [];
			$('.history').html('');
		}
		else if (button == '=') {
			var lastElement = history[history.length-1]; 
			if(typeof lastElement == 'undefined') {
				
			}
			else if (lastElement == '+' || lastElement == '-' || lastElement == 'x' || lastElement == '/') {
				history[history.length-1] = button;
			}
			else {
				history[history.length] = button;
			}
			$('.history').html(history.join(' '));	
		}
		console.log(history);
	};

	function doTheMath(){
		if (operator == '') {
			result = currentValue;
		}
		else if(operator == '+'){
			result = result + currentValue;
		}
		 else if(operator == '-'){
			result = result - currentValue;
		}
		else if(operator == 'x'){
			if (numbers.includes(lastClicked)) {
				result = result * currentValue;
			}
		}
		else if(operator == '/'){
			if (numbers.includes(lastClicked)) {
				result = result / currentValue;
			}
		}
		showDot = false;
	};
})(jQuery);