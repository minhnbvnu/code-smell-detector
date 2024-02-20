function _introForElement(targetElm) {
    var introItems = [],
        self = this;

    if (this._options.steps) {
      //use steps passed programmatically
      for (var i = 0, stepsLength = this._options.steps.length; i < stepsLength; i++) {
        var currentItem = _cloneObject(this._options.steps[i]);
        //set the step
        currentItem.step = introItems.length + 1;
        //use querySelector function only when developer used CSS selector
        if (typeof(currentItem.element) === 'string') {
          //grab the element with given selector from the page
          currentItem.element = document.querySelector(currentItem.element);
        }

        //intro without element
        if (typeof(currentItem.element) === 'undefined' || currentItem.element == null) {
          var floatingElementQuery = document.querySelector(".introjsFloatingElement");

          if (floatingElementQuery == null) {
            floatingElementQuery = document.createElement('div');
            floatingElementQuery.className = 'introjsFloatingElement';

            document.body.appendChild(floatingElementQuery);
          }

          currentItem.element  = floatingElementQuery;
          currentItem.position = 'floating';
        }

        if (currentItem.element != null) {
          introItems.push(currentItem);
        }
      }

    } else {
      //use steps from data-* annotations
      var allIntroSteps = targetElm.querySelectorAll('*[data-intro]');
      //if there's no element to intro
      if (allIntroSteps.length < 1) {
        return false;
      }

      //first add intro items with data-step
      for (var i = 0, elmsLength = allIntroSteps.length; i < elmsLength; i++) {
        var currentElement = allIntroSteps[i];

        // skip hidden elements
        if (currentElement.style.display == 'none') {
          continue;
        }

        var step = parseInt(currentElement.getAttribute('data-step'), 10);

        if (step > 0) {
          introItems[step - 1] = {
            element: currentElement,
            intro: currentElement.getAttribute('data-intro'),
            step: parseInt(currentElement.getAttribute('data-step'), 10),
            tooltipClass: currentElement.getAttribute('data-tooltipClass'),
            highlightClass: currentElement.getAttribute('data-highlightClass'),
            position: currentElement.getAttribute('data-position') || this._options.tooltipPosition
          };
        }
      }

      //next add intro items without data-step
      //todo: we need a cleanup here, two loops are redundant
      var nextStep = 0;
      for (var i = 0, elmsLength = allIntroSteps.length; i < elmsLength; i++) {
        var currentElement = allIntroSteps[i];

        if (currentElement.getAttribute('data-step') == null) {

          while (true) {
            if (typeof introItems[nextStep] == 'undefined') {
              break;
            } else {
              nextStep++;
            }
          }

          introItems[nextStep] = {
            element: currentElement,
            intro: currentElement.getAttribute('data-intro'),
            step: nextStep + 1,
            tooltipClass: currentElement.getAttribute('data-tooltipClass'),
            highlightClass: currentElement.getAttribute('data-highlightClass'),
            position: currentElement.getAttribute('data-position') || this._options.tooltipPosition
          };
        }
      }
    }

    //removing undefined/null elements
    var tempIntroItems = [];
    for (var z = 0; z < introItems.length; z++) {
      introItems[z] && tempIntroItems.push(introItems[z]);  // copy non-empty values to the end of the array
    }

    introItems = tempIntroItems;

    //Ok, sort all items with given steps
    introItems.sort(function (a, b) {
      return a.step - b.step;
    });

    //set it to the introJs object
    self._introItems = introItems;

    //add overlay layer to the page
    if(_addOverlayLayer.call(self, targetElm)) {
      //then, start the show
      _nextStep.call(self);

      var skipButton     = targetElm.querySelector('.introjs-skipbutton'),
          nextStepButton = targetElm.querySelector('.introjs-nextbutton');

      self._onKeyDown = function(e) {
        if (e.keyCode === 27 && self._options.exitOnEsc == true) {
          //escape key pressed, exit the intro
          //check if exit callback is defined
          _exitIntro.call(self, targetElm);
        } else if(e.keyCode === 37) {
          //left arrow
          _previousStep.call(self);
        } else if (e.keyCode === 39) {
          //right arrow
          _nextStep.call(self);
        } else if (e.keyCode === 13) {
          //srcElement === ie
          var target = e.target || e.srcElement;
          if (target && target.className.indexOf('introjs-prevbutton') > 0) {
            //user hit enter while focusing on previous button
            _previousStep.call(self);
          } else if (target && target.className.indexOf('introjs-skipbutton') > 0) {
            //user hit enter while focusing on skip button
            if (self._introItems.length - 1 == self._currentStep && typeof (self._introCompleteCallback) === 'function') {
                self._introCompleteCallback.call(self);
            }

            _exitIntro.call(self, targetElm);
          } else {
            //default behavior for responding to enter
            _nextStep.call(self);
          }

          //prevent default behaviour on hitting Enter, to prevent steps being skipped in some browsers
          if(e.preventDefault) {
            e.preventDefault();
          } else {
            e.returnValue = false;
          }
        }
      };

      self._onResize = function(e) {
        self.refresh.call(self);
      };

      if (window.addEventListener) {
        if (this._options.keyboardNavigation) {
          window.addEventListener('keydown', self._onKeyDown, true);
        }
        //for window resize
        window.addEventListener('resize', self._onResize, true);
      } else if (document.attachEvent) { //IE
        if (this._options.keyboardNavigation) {
          document.attachEvent('onkeydown', self._onKeyDown);
        }
        //for window resize
        document.attachEvent('onresize', self._onResize);
      }
    }
    return false;
  }