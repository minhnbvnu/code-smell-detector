function list(cell, onRendered, success, cancel, editorParams){
		var list = new Edit(this, cell, onRendered, success, cancel, editorParams);

		return list.input;
	}