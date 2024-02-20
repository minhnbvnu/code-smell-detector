function getScrollBarHeight() {
		var $outer = $('<div>').css({visibility: 'hidden', height: 100, overflow: 'scroll'}).appendTo('body');
		var heightWithScroll = $('<div>').css({height: '100%'}).appendTo($outer).outerHeight();
		$outer.remove();
		return 100 - heightWithScroll;
	}