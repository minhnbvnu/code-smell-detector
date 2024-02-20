function walkDomInplace(form, step) {
		var subResult,
		    child,
		    nextChild;
		if (1 === form.nodeType) {
			child = form.firstChild;
			while (child) {
				subResult = step(child);
				// Advance to the next child _after stepping into child_
				// to pick up modifications of the DOM.
				nextChild = child.nextSibling;
				if (subResult.length) {
					if (subResult[0] !== child) {
						form.replaceChild(subResult[0], child);
					}
				} else {
					form.removeChild(child);
				}
				child = nextChild;
			}
		}
		return form;
	}