function abortTestsButton() {
  		var button = document$$1.createElement("button");
  		button.id = "qunit-abort-tests-button";
  		button.innerHTML = "Abort";
  		addEvent(button, "click", abortTests);
  		return button;
  	}