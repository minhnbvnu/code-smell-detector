function showSlide(back_step, updatepv) {
  // allows the master presenter view to disable the update callback
  updatepv = (typeof(updatepv) === 'undefined') ? true : updatepv;

	if(slidenum < 0) {
		slidenum = 0
		return
	}

	if(slidenum > (slideTotal - 1)) {
		slidenum = slideTotal - 1
		return
	}

  // stop annotations on old slide if we're a presenter
  if(currentSlide && typeof slaveWindow !== 'undefined') {
    currentSlide.find('canvas.annotations').first().stopAnnotation();
  }

  if(currentSlide) { currentSlide.removeClass('currentSlide') };
  currentSlide = slides.eq(slidenum)
  currentSlide.addClass('currentSlide');

  var transition = currentSlide.attr('data-transition')
  var fullPage = currentSlide.find(".content").is('.full-page');

  if (back_step || fullPage) {
    transition = 'none'
  }

  $('#preso').cycle(slidenum, transition)

	if (fullPage) {
		$('#preso').css({'width' : '100%', 'overflow' : 'visible'});
		currentSlide.css({'width' : '100%', 'text-align' : 'center', 'overflow' : 'visible'});
	} else {
		$('#preso').css({'width' : '', 'overflow' : ''});
	}

	percent = getSlidePercent()
	$("#slideInfo").text((slidenum + 1) + '/' + slideTotal + '	- ' + percent + '%')

	if(!back_step) {
		// determine if there are incremental bullets to show
		// unless we are moving backward
		determineIncremental()
	} else {
		incrCurr = 0
		incrSteps = 0
	}
	location.hash = slidenum + 1;

	removeResults();

  var currentContent = $(currentSlide).find(".content")
	currentContent.trigger("showoff:show");

	var ret = setCurrentNotes();

	var fileName = currentSlide.children('div').first().attr('ref');
  $('#slideFilename').text(fileName);

  if (query.next) {
    $(currentSlide).find('li').removeClass('hidden');
  }

  if (typeof annotations !== 'undefined') {
    if(typeof slaveWindow == 'undefined') {
      // hook up the annotations for viewing
      currentSlide.find('canvas.annotations').annotationListener(annotations);
    }
    else {
      if (mode.annotations) {
        currentSlide.find('canvas.annotations').annotate(annotations);
      }
    }
  }

  // if we're a slave/display window
  if('presenterView' in window) {
    var pv = window.presenterView;

    // Update presenter view, if it's tracking us
    if (updatepv) {
      pv.slidenum  = slidenum;
      pv.incrCurr  = incrCurr
      pv.incrSteps = incrSteps

      pv.showSlide(true);
      pv.postSlide();
      pv.update();
    }

    // if the slide is marked to autoplay videos, then fire them off!
    if(currentSlide.hasClass('autoplay')) {
      console.log('Autoplaying ' + currentSlide.attr('id'))
      setTimeout(function(){
        $(currentSlide).find('video').each(function() {
          $(this).get(0).play();
        });
      }, 1000);
    }
  }

  // Update nav
  $('.highlighted').removeClass('highlighted');
  $('#navigation ul ul').hide();

  var active = $(".navItem").get(slidenum);
  $(active).parent().addClass('highlighted');
  $(active).parent().parent().show();

  updateMenuChevrons();

  // copy notes to the notes field for mobile.
  postSlide();

  // is this an activity slide that has not yet been marked complete?
  if (currentSlide.hasClass('activity')) {
     if (currentSlide.find('input.activity').is(":checked")) {
      activityIncomplete = false;
      sendActivityStatus(true);
    }
    else {
      activityIncomplete = true;
      sendActivityStatus(false);
    }
  }
  else {
    activityIncomplete = false;
  }

  if(autoTour) {
    if(currentSlide.hasClass('activity')) {
      showTour('showoff:activity');
    }
    if(getSlideOption('form')) {
      showTour('showoff:form');
    }
    var tour = getSlideOption('tour');
    if(tour) {
      showTour(tour);
    }
  }

  // show the sync button if we're not on the same slide as the presenter
  checkSyncState();

  // make all bigly text tremendous
  currentSlide.children('.content.bigtext').bigtext();

  // render any diagrams on the slide
  mermaid.init(undefined, currentSlide.find('code.language-render-diagram'));

  return ret;
}