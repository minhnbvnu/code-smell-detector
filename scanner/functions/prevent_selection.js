function prevent_selection($el) {
	$el.on("mousedown selectstart contextmenu", (e) => {
		if(e.isDefaultPrevented()){
			return;
		}
		if(
			e.target instanceof HTMLSelectElement ||
			e.target instanceof HTMLTextAreaElement ||
			(e.target instanceof HTMLLabelElement && e.type !== "contextmenu") ||
			(e.target instanceof HTMLInputElement && e.target.type !== "color")
		){
			return;
		}
		if(e.button === 1){
			return; // allow middle-click scrolling
		}
		e.preventDefault();
		// we're just trying to prevent selection
		// but part of the default for mousedown is *deselection*
		// so we have to do that ourselves explicitly
		window.getSelection().removeAllRanges();
	});
}