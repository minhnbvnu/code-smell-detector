function footerInit() {
	  // modal mode
	  $('.am-footer-ysp').on('click', function() {
	    $('#am-footer-modal').modal();
	  });

	  var options = UI.utils.parseOptions($('.am-footer').data('amFooter'));
	  options.addToHS && addToHS();

	  // switch mode
	  // switch to desktop
	  $('[data-rel="desktop"]').on('click', function(e) {
	    e.preventDefault();
	    if (window.AMPlatform) { // front end
	      window.AMPlatform.util.goDesktop();
	    } else { // back end
	      cookie.set('allmobilize', 'desktop', '', '/');
	      window.location = window.location;
	    }
	  });
	}