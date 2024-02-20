function headerInit() {
	  $('[data-am-widget="header"]').each(function() {
	    if ($(this).hasClass('am-header-fixed')) {
	      $('body').addClass('am-with-fixed-header');
	      return false;
	    }
	  });
	}