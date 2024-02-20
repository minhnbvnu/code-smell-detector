function tabsInit() {
	  $('[data-am-widget="tabs"]').each(function() {
	    var options = $(this).data('amTabsNoswipe') ? {noSwipe: 1} : {};
	    $(this).tabs(options);
	  });
	}