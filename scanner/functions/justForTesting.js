function justForTesting() {
	logOb.file(function(file) {
		var reader = new FileReader();

		reader.onloadend = function(e) {
			console.log(this.result);
		};

		reader.readAsText(file);
	}, fail);

}