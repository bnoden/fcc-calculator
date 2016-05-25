// TODO: fix percent button function



$(document).ready(function(){


function quickBtn(value){
	  this.value = value;
	  }

var input = $('#input'), output = '';

quickBtn.prototype.li = function(){
	return ('<li class="btn" value='+this.value+'>'+this.value+'</li>');
}

	var allClear = new quickBtn('AC'), clearEntry = new quickBtn('CE'), percent = new quickBtn('%'), divide = new quickBtn('&#47'),
		seven = new quickBtn('7'), eight = new quickBtn('8'), nine = new quickBtn('9'), multiply = new quickBtn('*'),
		four = new quickBtn('4'), five = new quickBtn('5'), six = new quickBtn('6'), minus = new quickBtn('-'),
		one = new quickBtn('1'), two = new quickBtn('2'), three = new quickBtn('3'), plus = new quickBtn('+'),
		dec = new quickBtn('.'), zero = new quickBtn('0'), equal = new quickBtn('=');

	var btn = [allClear, clearEntry, percent, divide, seven, eight, nine, multiply, four, five, six, minus,
		one, two, three, plus, dec, zero, equal];

	for (var i in btn){
		$('#keypad ul').append(btn[i].li());
		console.log(btn[i].li());
	};

	var decInput = true;
	var decToggle = function(bool) {
		if (decInput)
			bool = false;
		if (!decInput)
			bool = true;
		return decInput = bool;
	};

	function outputSize(size) {
		if (output.length < 9) {
			size = '34px';
		} else if (output.length < 13) {
			size = '28px'
		} else if (output.length < 18) {
			size = '18px'
		} else if (output.length < 25) {
			size = '12px'
		}
		input.css('font-size', size);
	};

	var solution = '', getPercent = '';
	var inputLast = function(str) {
		return str.slice(-1);
	};
	//var outputLast = function(str) {
	//	return str.replace(/[^0-9.]+/g, ",");
	//};
	var percentage = function(str, a, b, c, d, e) {
		a = str.replace(/[^0-9.]+/g, ",");
		b = a.split(',').pop();
		c = 0.01;
		d = b*c;
		e = eval(d);
		return e.toString();
	}

	$('#keypad li').on('click', function() {
		outputSize();
		if ( output.length < 25 && !isNaN($(this).html()) && $(this).html() !== zero.value ) {
			if ( output.length === 1 && output[0] === zero.value ) {
				output = $(this).html();
			} else output += $(this).html();
		}

		if ( $(this).html() === zero.value && !( output.length === 1 && output[0] === zero.value ) ) {
			output+=$(this).html();
		}

		if ( $(this).html() === allClear.value ) {
			output = '';
			input.css('font-size', '34px');
			decToggle();
		}

		if ( $(this).html() === clearEntry.value ) {
			if ( inputLast(output) === dec.value ) {
				decToggle();
			}
			output = output.slice(0, -1);
		}

		if ( $(this).html() === dec.value ) {
			if ( decInput ) {
				if ( output.length < 1 && inputLast(output) !== zero.value ) {
					output += zero.value;
				}
				output += dec.value;
				decToggle();
			}
		}

		if ( $(this).html() === '/' || $(this).html() === multiply.value ||
			$(this).html() === minus.value || $(this).html() === plus.value ) {
			if ( inputLast(output) !== '/' && inputLast(output) !== multiply.value &&
				inputLast(output) !== minus.value && inputLast(output) !== plus.value ) {
				output += $(this).html();
			decToggle();
			}
		}

		if ( $(this).html() === percent.value && output.length > 0) {
			if ( output.length > 0 ) {
				getPercent = percentage(output);
				console.log('percentage = '+ getPercent)
				output += getPercent;
			}

		}

		if ( $(this).html() === equal.value ) {
			solution = eval(output).toString();
			output = solution;

		}

		input.val(output);
		console.log('input.val() = '+input.val());
		console.log('parseInt(input.val()) = '+parseInt(input.val()));
		console.log('decInput: '+decInput);
		console.log('output length = '+output.length);
		console.log('solution = '+solution);

		});











});

