function setupGlob() {
	
	var globError = function(err) {
		console.log('[globalization error]',err);	
	};
	
	document.querySelector('#testGlob').addEventListener('click', function() {
		
		navigator.globalization.getPreferredLanguage(function(lang) {
			console.log('[globalization] preferredLanguage: '+JSON.stringify(lang));
		});

		navigator.globalization.getLocaleName(function(locale) {
			console.log('[globalization] localeName: '+JSON.stringify(locale));
		});

		navigator.globalization.getDateNames(function(names) {
			console.log('[globalization] getDateNames:months: '+JSON.stringify(names));
		},globError, {type:'wide', item:'months'});

		navigator.globalization.getDateNames(function(names) {
			console.log('[globalization] getDateNames:days: '+JSON.stringify(names));
		},globError, {type:'wide', item:'days'});
		
	});

	document.querySelector('#testGlobInput').addEventListener('click', function() {
		var input = document.querySelector('#numberGlob').value;
		console.log('[globalization] initial input to format: '+input);
		navigator.globalization.numberToString(
			Number(input),
			function (number) {
				console.log('[globalization] formatted number: '+number.value);
			},
			globError,
			{type:'percent'}
		);
	});
	
}