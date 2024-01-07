function shuffle(array) {
	  var counter = array.length;
	  var temp = 0;
	  var index = 0; // While there are elements in the array

	  while (counter > 0) {
	    // Pick a random index
	    index = Math.random() * counter | 0; // Decrease counter by 1

	    counter--; // And swap the last element with it

	    temp = array[counter];
	    array[counter] = array[index];
	    array[index] = temp;
	  }
	}