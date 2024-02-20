function oneDigitIfLengthOne() {
			if ( length === 1 ) {

				// Unicode equivalent to /\d/
				numeric = true;
				return tokenRe = digitsRe;
			}
		}