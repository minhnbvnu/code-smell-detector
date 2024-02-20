function hammerify(el, options) {
	    var $el = $(el);
	    if (!$el.data('hammer')) {
	      $el.data('hammer', new Hammer($el[0], options));
	    }
	  }