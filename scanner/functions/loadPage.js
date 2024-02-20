function loadPage(name) {
	if (!name) name = "home";
	var pageBundle;
	var args = Array.prototype.slice.call(arguments, 1);
	if (!app.stats && name != "select") {
		args.unshift(name);
		name = "upload";
	}
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
	import("./pages/" + name + "/page.js")
		.catch(err => {
			args.unshift(err, name);
			return import(/* webpackMode: "eager" */ "./pages/error/page.js");
		})
		.then(activatePageModule);
}