function addNewLabel(e) {
	var index = ctr % Alloy.Globals.classes.length;
	var label = $.UI.create('Label', {
		classes: Alloy.Globals.classes[index],
		id: 'newLabel' + (ctr + 1),
		text: 'this is label #' + (ctr + 1),
		touchEnabled: false
	});

	$.index.add(label);
	ctr++;
}