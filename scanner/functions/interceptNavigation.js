function interceptNavigation(ev) {
  		applyUrlParams();

  		if (ev && ev.preventDefault) {
  			ev.preventDefault();
  		}

  		return false;
  	}