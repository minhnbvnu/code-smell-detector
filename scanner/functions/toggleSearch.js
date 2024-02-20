function toggleSearch() {
		var inputbox = document.getElementById("searchinput");
		if (inputbox.style.display !== "inline") {
			openSearch();
		}
		else {
			inputbox.style.display = "none";
			myHilitor.remove();
		}
	}