function activate_window($window) {
		// console.log("Activating window:", $window);
		$window.unminimize();
		$window.bringToFront();
		$window.focus(); // unminimize will focus but only if it was minimized (that's the current behavior anyway)
	}