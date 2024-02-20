function initializePresentation() {
	// unhide for height to work in static mode
  $("#slides").show();

	//copy into presentation area
	$("#preso").empty()
	$('#slides > .slide').appendTo($("#preso"))

	//populate vars
	slides = $('#preso > .slide')
	slideTotal = slides.size()

	//setup manual jquery cycle
	$('#preso').cycle({
		timeout: 0
	})

	setupMenu();

	if (slidesLoaded) {
		showSlide()
	} else {
		showFirstSlide();
		slidesLoaded = true
	}
	setupSlideParamsCheck();

  // Remove spinner in case we're reloading
  $('body').removeClass('busy');

  $('pre.highlight code').each(function(i, block) {
    try {
      // syntax highlight the code
      hljs.highlightBlock(block);

      // then add focus on any lines marked
      highlightLines(block);

      if($(block).hasClass('numbers')) {
        hljs.lineNumbersBlock(block);
      }

    } catch(e) {
      console.log('Syntax highlighting failed on ' + $(this).closest('div.slide').attr('id'));
      console.log('Syntax highlighting failed for ' + $(this).attr('class'));
      console.log(e);
    }
  });

  $(".content form").submit(function(e) {
    e.preventDefault();
    submitForm($(this));
  });

  // suspend hotkey handling
  $(".content form :input").focus( function() {
    toggleKeybinding();
  });
  $(".content form :input").blur( function() {
    toggleKeybinding();
  });

  $(".content form :input").change(function(e) {
    enableForm($(this));
  });

  $(".content form div.tools input.display").click(function(e) {
    var form   = $(this).closest('form');
    var formID = form.attr('id');

    ws.send(JSON.stringify({ message: 'answerkey', formID: formID}));
    try {
      // If we're a presenter, try to bust open the slave display
      slaveWindow.renderForm(formID);
    }
    catch (e) {
      console.log(e);
      renderForm(form);
    }
  });

  $('.slide.activity .activityToggle input.activity').checkboxradio();
  $('.slide.activity .activityToggle input.activity').change(toggleComplete);

  // initialize mermaid, but don't render yet since the slide sizes are indeterminate
  mermaid.initialize({startOnLoad:false});

  // translate SVG images, inlining them first if needed.
  $('img').simpleStrings({strings: user_translations});
  $('svg').simpleStrings({strings: user_translations});
  $('.translate').simpleStrings({strings: user_translations});

  $("#preso").trigger("showoff:loaded");
}