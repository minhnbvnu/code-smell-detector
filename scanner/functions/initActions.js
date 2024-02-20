function initActions() {
	    $navBarNav.append($moreLink);

	    $navBarNav.
	      find('li').
	      not('.am-navbar-more').
	      slice(calcSuiteItems() - 1).
	      appendTo($moreActions);

	    // Append more actions
	    $navBar.append($moreActions);
	  }