function galleryInit() {
	  var $gallery = $('[data-am-widget="gallery"]');

	  $gallery.each(function() {
	    var options = UI.utils.parseOptions($(this).attr('data-am-gallery'));

	    if (options.pureview) {
	      (typeof options.pureview === 'object') ?
	        $(this).pureview(options.pureview) : $(this).pureview();
	    }
	  });
	}