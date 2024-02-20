function loadFromFile() {
		var files = $("#file")[0].files;
		var fileReader = new FileReader();
		fileReader.readAsText(files[0]);
		fileReader.onload = function() {
			var data = fileReader.result;
			app.load(JSON.parse(data));
			$(".modal").modal("hide");
			app.loadPage.apply(app, nextPage);
		};
		fileReader.onerror = function(err) {
			alert(err);
		};
	}