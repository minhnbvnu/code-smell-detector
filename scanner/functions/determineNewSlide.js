function determineNewSlide( num, currSlideNum ){
		var newSlide = 0, relative = false, sign;

		if( typeof num === "string" ){
			sign = num.charAt( 0 );
			if( sign === "+" || sign === "-" ){
				relative = true;
			}
		}
		if( relative ){
			newSlide = parseInt( num, 10 ) + currSlideNum;
		} else {
			newSlide = parseInt( num, 10 );
		}
		return newSlide;
	}