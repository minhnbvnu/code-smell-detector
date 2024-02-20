function showTour(name, record) {
  record = (typeof record == 'undefined' ? true : record) // default true

  // we don't need to show tours if we're a display view
  if('presenterView' in window) {
    return false;
  }

  // don't blow up if someone calls a missing tour
  if(!(name in tours)) {
    console.log('No such tour: '+name);
    return false;
  }

  var clientTours = document.cookieHash['tours'] || [];

  // if we haven't seen this one before...
  if(clientTours.indexOf(name) == -1) {
    toggleKeybinding('off');

    var steps = tours[name] || [];

    var intro = introJs();
    intro.setOptions({
      showStepNumbers: false,
      showBullets: false,
      steps: steps
    });

    if(steps.length > 1) {
      intro.setOption("showBullets", true);
    }

    intro.onexit(function() {
      toggleKeybinding('on');

      if(menuTourRunning) {
        menuTourRunning = false;
        $("#hamburger").off('click', null, introNext);
        $("#closeMenu").off('click', null, introClose);
        closeMenu();
      }
    });

    // record tour completion so we don't continue to annoy people
    intro.oncomplete(function() {
      if(record) {
        clientTours.push(name);
        document.cookieHash['tours'] = clientTours;
        document.cookie = "tours="+JSON.stringify(clientTours)+"; max-age=31536000; path=/;";
      }

      // this keeps track of the version of the presenter tour we've seen
      if(name == 'showoff:presenter:auto') {
        document.cookie = "tourVersion="+tourVersion+"; max-age=31536000; path=/;";
        document.cookieHash['tourVersion'] = tourVersion;

        // we don't need this anymore; let's save a byte or three
        delete tours['showoff:presenter:auto'];
      }

    });

    // if we're showing the menu, we need to do some extra bookeeping to make it usable
    if(name == 'showoff:menu') {
      menuTourRunning = true;

      // A couple helper functions to add to the menu bindings.
      // We have to do it here because 'intro' is in scope
      var introNext  = function() { intro.nextStep() };
      var introClose = function() { intro.exit()     };

      $("#hamburger").on('click', null, introNext);
      $("#closeMenu").on('click', null, introClose);

      intro.onchange(function(targetElement) {
        switch(intro._currentStep) {
          case 0:
            closeMenu(true);
            break;

          case 1:
            openMenu();
            break;
        }
      });

      // keep the menu visible. This is a hack, but I don't see a better way.
      intro.onafterchange(function(targetElement) {
        $("#feedbackSidebar").removeClass('introjs-fixParent');
      });
    }

    intro.start();
  }
}