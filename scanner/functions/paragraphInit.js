function paragraphInit() {
	  var $paragraph = $('[data-am-widget="paragraph"]');

	  $paragraph.each(function(index) {
	    var $this = $(this);
	    var options = UI.utils.parseOptions($this.attr('data-am-paragraph'));
	    var $index = index;

	    if (options.pureview) {
	      $this.pureview();
	    }

	    if (options.tableScrollable) {
	      $this.find('table').each(function(index) {
	        if ($(this).width() > $(window).width()) {
	          $(this).scrollTable($index + '-' + index);
	        }
	      });
	    }
	  });
	}