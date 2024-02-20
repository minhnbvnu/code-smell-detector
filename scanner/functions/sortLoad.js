function sortLoad(callback) {
	let jsFile = document.createElement("script")
	jsFile.setAttribute("src", "/js/sortable.min.js")
	jsFile.addEventListener("load", function () {
		if (typeof (callback) == "function") {
			callback()
		}
	})
	document.head.appendChild(jsFile)
}