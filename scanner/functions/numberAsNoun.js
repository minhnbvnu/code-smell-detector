function numberAsNoun(number) {
	        var hundred = Math.floor((number % 1000) / 100),
	        ten = Math.floor((number % 100) / 10),
	        one = number % 10,
	        word = '';
	        if (hundred > 0) {
	            word += numbersNouns[hundred] + 'vatlh';
	        }
	        if (ten > 0) {
	            word += ((word !== '') ? ' ' : '') + numbersNouns[ten] + 'maH';
	        }
	        if (one > 0) {
	            word += ((word !== '') ? ' ' : '') + numbersNouns[one];
	        }
	        return (word === '') ? 'pagh' : word;
	    }