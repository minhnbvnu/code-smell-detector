function getDeleteCommand(e) {
	  // Allow default "cut" behavior for Windows on Shift + Delete.
	  if (isWindows && e.shiftKey) {
	    return null;
	  }
	  return shouldRemoveWord(e) ? 'delete-word' : 'delete';
	}