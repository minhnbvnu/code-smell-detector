function setupPreso(load_slides) {
	if (preso_started) {
		alert("already started");
		return;
	}
	preso_started = true;

  if (! cssPropertySupported('flex') ) {
    // TODO: translate this this page!
    window.location = 'unsupported.html';
  }

  if (! cssPropertySupported('zoom') ) {
    $('body').addClass('no-zoom');
  }

	// save our query string as an object for later use
	query = $.parseQuery();

	// Load slides fetches images
	loadSlidesBool = load_slides;
	loadSlides(loadSlidesBool);

  setupSideMenu();

  // Set up the language selector
  $('#languageSelector').change(function(e) { chooseLanguage(e.target.value); });
  chooseLanguage(null);

  doDebugStuff();

	// bind event handlers
	toggleKeybinding('on');

	$('#preso').addSwipeEvents().
//		bind('tap', swipeLeft).         // next
		bind('swipeleft', swipeLeft).   // next
		bind('swiperight', swipeRight); // prev

  $('#buttonNav #buttonPrev').click(prevStep);
  $('#buttonNav #buttonNext').click(nextStep);

  // give us the ability to disable tracking via url parameter
  if(query.track == 'false') mode.track = false;

  // Make sure the slides always look right.
  // Better would be dynamic calculations, but this is enough for now.
  zoom();
  $(window).resize(function() {zoom();});

  // yes, this is a global
  annotations = new Annotate();

  // must be defined using [] syntax for a variable button name on IE.
  var buttons = [
    {
      text: I18n.t('help.close'),
      click: function() { $(this).dialog( "close" ); }
    }
  ];

  if($("body").hasClass("presenter")) {
    buttons.push({
      text: I18n.t('tour.show'),
      "class": 'right',
      click: function() {
        $(this).dialog( "close" );
        showTour('showoff:presenter', false);
      }
    });
  }
  else {
    buttons.push({
      text: I18n.t('tour.reset'),
      "class": 'auxillary right',
      click: function() {
        document.cookie="tours=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        document.cookie="tourVersion=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        delete document.cookieHash['tours'];
        delete document.cookieHash['tourVersion'];
      }
    });
  }

  $("#help-modal").dialog({
    autoOpen: false,
    dialogClass: "no-close",
    draggable: false,
    height: 640,
    modal: true,
    resizable: false,
    width: 640,
    buttons: buttons
  });

  $("#synchronize").button();
  $("#synchronize").click(function() {
    synchronize();
  });

  // wait until the presentation is loaded to hook up the previews.
  $("body").bind("showoff:loaded", function (event) {
    var target = $('#navigationHover');

    $('#navigation li a.navItem').hover(function() {
      var position = $(this).position();
      var source   = slides.eq($(this).attr('rel'));

      target.css({top: position.top, left: position.left + $('#navigation').width() + 5})
      target.html(source.html());

      copyBackground(source, target);

      target.show();
    },function() {
      target.hide();
    });
  });

  // Open up our control socket
  connectControlChannel();

}