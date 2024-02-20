function changeStyle(e) {
	// Get a reference to the style properties we will use when creating our
	// styled Titanium API component.
	var styleArgs = styles[index++];
	Alloy.Globals.print(styleArgs, 'styleArgs');

	// let's add the default test to the style arguments
	styleArgs.text = 'test label';

	// Remove the existing label.
	if (testLabel) {
		$.container.remove(testLabel);
		testLabel.removeEventListener('click', changeStyle);
	}

	// Use $.UI.create() to create a styles Ti.UI.Label
	testLabel = $.UI.create('Label', styleArgs);
	testLabel.addEventListener('click', changeStyle);
	$.container.add(testLabel);

	// reset the index
	if (index >= styles.length) { index = 0; }
}