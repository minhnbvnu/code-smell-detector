function figureInit() {
	  $('.am-figure').each(function(i, item) {
	    var options = UI.utils.parseOptions($(item).attr('data-am-figure'));
	    var $item = $(item);
	    var data;

	    if (options.pureview) {
	      if (options.pureview === 'auto') {
	        var zoomAble = $.isImgZoomAble($item.find('img')[0]);
	        zoomAble && $item.pureview();
	      } else {
	        $item.addClass('am-figure-zoomable').pureview();
	      }
	    }

	    data = $item.data('amui.pureview');

	    if (data) {
	      $item.on('click', ':not(img)', function() {
	        data.open(0);
	      });
	    }
	  });
	}