function loadFromExample(n) {
		import(`./example${n}.json`).then(function(exampleModule) {
			var example = exampleModule.default;
			app.load(example);
			$(".modal").modal("hide");
			app.loadPage.apply(app, nextPage);
		});
	}