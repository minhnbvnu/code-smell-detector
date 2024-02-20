function bindButton (selector, action, pane) {
		switch (action.toLowerCase()) {
			case "toggle":			addToggleBtn(selector, pane);		break;	
			case "open":			addOpenBtn(selector, pane);			break;
			case "close":			addCloseBtn(selector, pane);		break;
			case "pin":				addPinBtn(selector, pane);			break;
			case "toggle-slide":	addToggleBtn(selector, pane, true);	break;	
			case "open-slide":		addOpenBtn(selector, pane, true);	break;
		}
	}