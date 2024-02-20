function specialMutationForYears(number) {
	        switch (lastNumber(number)) {
	            case 1:
	            case 3:
	            case 4:
	            case 5:
	            case 9:
	                return number + ' bloaz';
	            default:
	                return number + ' vloaz';
	        }
	    }