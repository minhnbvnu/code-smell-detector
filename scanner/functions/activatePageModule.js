function activatePageModule(pageModule) {
		var page = pageModule.default;
		$(function() {
			if (lastPage) lastPage();
			lastPage = page.apply(null, args);
			window.scrollTo(0, 0);
			if (name !== "upload") {
				ga("send", "pageview", {
					page:
						window.location.pathname.replace(/\/$/, "") +
						"/" +
						[name].concat(args).join("/"),
					title: document.title
				});
			}
		});
	}