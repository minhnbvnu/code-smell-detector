function clickButtonVisibly(button) {

	$(button).trigger($.Event("pointerdown", {
		pointerId: 12345,
		pointerType: "mouse",
		button: 0,
		buttons: 1,
		isPrimary: true,
	}));
	$(button).trigger($.Event("pointerup", {
		pointerId: 12345,
		pointerType: "mouse",
		button: 0,
		buttons: 0,
		isPrimary: true,
	}));

	if (button.matches("button:not(.toggle)")) {
		button.style.borderImage = "var(--inset-deep-border-image)";
		setTimeout(()=> {
			button.style.borderImage = "";
			// delay the button.click() as well, so the pressed state is
			// visible even if the button action closes a dialog
			window.untrusted_gesture = true;
			button.click();
			window.untrusted_gesture = false;
		}, 100);
	} else {
		window.untrusted_gesture = true;
		button.click();
		window.untrusted_gesture = false;
	}
}