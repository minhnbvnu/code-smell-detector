function uptime$1() {
	  var currentTime = new Date();
	  var dif = currentTime - startTime$1;
	  return dif / 1000;
	}