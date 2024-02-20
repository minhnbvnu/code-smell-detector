function setupAcc() {
	
	var watchId;
	
	var renderAcc = function(data) {
		console.log('[acceleration]' + JSON.stringify(data));
	};
	
	var accError = function(err) {
		console.log('[acceleration error]',err);	
	};
	
	document.querySelector('#testAcc').addEventListener('click', function() {
		
		navigator.accelerometer.getCurrentAcceleration(renderAcc,accError);
		
	});

	document.querySelector('#testAccWatch').addEventListener('click', function() {
		console.log('[acceleration] begin watch');
		watchId = navigator.accelerometer.watchAcceleration(renderAcc,accError,
		{frequency:1000});
		
	});

	document.querySelector('#testAccStop').addEventListener('click', function() {
		console.log('[acceleration] clear watch');		
		navigator.accelerometer.clearWatch(watchId);
		
	});

}