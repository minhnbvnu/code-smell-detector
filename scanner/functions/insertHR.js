function insertHR() {
		if (Aloha.activeEditable) {
			var range = Aloha.Selection.getRangeObject();
			Dom.insertIntoDOM($('<hr>'), range, Aloha.activeEditable.obj, true);
			range.select();
		}
	}