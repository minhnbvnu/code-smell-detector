function Pinball() {
	var $win = make_iframe_window({
		src: "programs/pinball/space-cadet.html",
		icons: iconsAtTwoSizes("pinball"),
		title: "3D Pinball for Windows - Space Cadet",
		innerWidth: 600,
		innerHeight: 416 + 20, // @TODO: where's this 20 coming from?
		minInnerWidth: 600,
		minInnerHeight: 416 + 20,
		// resizable: false, // @TODO (maybe) once gray maximized button is implemented
		override_alert: false, // to handle the alert as a fatal error, and to compensate for overzealous preventDefault()
	});
	const $splash = $("<div>").css({
		position: "fixed",
		top: 0,
		left: 0,
		width: "100%",
		height: "100%",
		background: "url(images/pinball-splash.png) no-repeat center center",
		backgroundColor: "black",
		zIndex: $Window.Z_INDEX + 6000,
	}).appendTo("body");
	setTimeout(() => {
		$splash.remove(); // just in case
	}, 5000);
	$win.$content.find("iframe").on("game-loaded", () => { // custom event dispatched from within the iframe
		$splash.remove();
	});
	$win.$content.find("iframe").on("game-load-failed", () => { // custom event dispatched from within the iframe
		$splash.remove();
		// on some systems, if the game fails to load,
		// it may result in the canvas showing through to the desktop behind the browser window
		// let's call it a feature, tie it in thematically,
		// and pretend like we did it on purpose, to baffle and amuse.
		// This happens for me on Chrome on Ubuntu with Xfce, when coming out of suspend.
		// It says "Could not create renderer / Couldn't find matching render driver"
		// It keeps happening with live reload, but stops on a regular reload, or duplicating the tab.
		$win.title("Wormhole Window - Space Cadet");
	});
	return new Task($win);
}