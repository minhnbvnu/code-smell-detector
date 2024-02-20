function drawCoords() {

	if(coords.length) { //if remaining coords, go to next

		console.log('Going to next coord at:  ' + coords[0] + ' in ' + (delay/1000) + ' seconds');

		setTimeout(function() {

			robot.once('synchronizedMoveDone', function() {

				drawCoords(); //recursion

			}.bind(this));

			robot.synchronizedMove(coords[0]);

			coords.shift();

			console.log("remaining coords => " + coords.length);

		}.bind(this), delay);

	} else {

		console.log("finished drawing coords, entering calibrate mode -- PRESS ORANGE BUTTON ON NXT BRICK TO END");
		robot.calibrate();
		//process.exit(0);

		// robot.moveToZero(true);

		// robot.once('moveToZeroDone', function() {

		// 	console.log("EXITING");

		// 	process.exit(0);

		// }.bind(this));
	}
}