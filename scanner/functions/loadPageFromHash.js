function loadPageFromHash() {
	loadPage.apply(null, location.hash.replace(/^#/, "").split("/"));
}