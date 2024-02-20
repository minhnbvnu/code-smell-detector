function getBtn (selector, pane, action) {
		var $E	= $(selector);
		if (!$E.length) // element not found
			alert(lang.errButton + lang.selector +": "+ selector);
		else if (_c.borderPanes.indexOf(pane) == -1) // invalid 'pane' sepecified
			alert(lang.errButton + lang.Pane.toLowerCase() +": "+ pane);
		else { // VALID
			var btn = options[pane].buttonClass +"-"+ action;
			$E
				.addClass( btn +" "+ btn +"-"+ pane )
				.data("layoutName", options.name) // add layout identifier - even if blank!
			;
			return $E;
		}
		return null;  // INVALID
	}