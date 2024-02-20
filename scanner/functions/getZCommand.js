function getZCommand(e) {
	  if (!hasCommandModifier(e)) {
	    return null;
	  }
	  return e.shiftKey ? 'redo' : 'undo';
	}