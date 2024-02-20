function goTopInit() {
	  var $goTop = $('[data-am-widget="gotop"]');
	  var $fixed = $goTop.filter('.am-gotop-fixed');
	  var $win = $(window);

	  if ($goTop.data('init')) {
	    return;
	  }

	  $goTop.find('a').on('click', function(e) {
	    e.preventDefault();
	    $win.smoothScroll();
	  });

	  function checkPosition() {
	    $fixed[($win.scrollTop() > 50 ? 'add' : 'remove') + 'Class']('am-active');
	  }

	  checkPosition();

	  $win.on('scroll.gotop.amui', UI.utils.debounce(checkPosition, 100));

	  $goTop.data('init', true);
	}