function setupOr() {
	
	var watchId;
	
	var renderOr = function(data) {
		console.log('[orientation]' + JSON.stringify(data));
	};
	
	var orError = function(err) {
		console.log('[orientation error]',err);	
	};
	
	document.querySelector('#testOr').addEventListener('click', function() {
		
		navigator.compass.getCurrentHeading(renderOr,orError);
		
	});

	document.querySelector('#testOrWatch').addEventListener('click', function() {
		console.log('[orientation] begin watch');
		watchId = navigator.compass.watchHeading(renderOr,orError,
		{frequency:1000});
		
	});

	document.querySelector('#testOrStop').addEventListener('click', function() {
		console.log('[orientation] clear watch');		
		navigator.compass.clearWatch(watchId);
		
	});

}