function openSearch() {
		//ensure the search term input dialog is visible and has focus:
		var inputbox = document.getElementById("searchinput");
		inputbox.style.display = "inline";
		inputbox.focus();
		inputbox.select();
	}