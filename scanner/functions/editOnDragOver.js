function editOnDragOver(editor, e) {
	  editor._internalDrag = false;
	  editor.setMode('drag');
	  e.preventDefault();
	}