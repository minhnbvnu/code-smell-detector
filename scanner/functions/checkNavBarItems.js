function checkNavBarItems() {
	    if (calcSuiteItems() >= navItemsCounter) {
	      // 显示所有链接，隐藏 more
	      $moreLink.hide();
	      $moreActions.find('li').insertBefore($moreLink);
	      return;
	    }

	    !$navBar.find('.am-navbar-actions').length && initActions();

	    $moreLink.show();

	    if ($navBarNav.find('li').length < calcSuiteItems()) {
	      $moreActions.find('li').
	        slice(0, calcSuiteItems() - $navBarNav.find('li').length).
	        insertBefore($moreLink);
	    } else if ($navBarNav.find('li').length > calcSuiteItems()) {
	      if ($moreActions.find('li').length) {
	        $navBarNav.find('li').not($moreLink).slice(calcSuiteItems() - 1).
	          insertBefore($moreActions.find('li').first());
	      } else {
	        $navBarNav.find('li').not($moreLink).slice(calcSuiteItems() - 1).
	          appendTo($moreActions);
	      }
	    }
	  }