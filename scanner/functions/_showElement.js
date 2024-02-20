function _showElement(targetElement) {
    if (typeof (this._introChangeCallback) !== 'undefined') {
      this._introChangeCallback.call(this, targetElement.element);
    }

    var self = this,
        oldHelperLayer = document.querySelector('.introjs-helperLayer'),
        oldReferenceLayer = document.querySelector('.introjs-tooltipReferenceLayer'),
        highlightClass = 'introjs-helperLayer',
        elementPosition = _getOffset(targetElement.element);

    //check for a current step highlight class
    if (typeof (targetElement.highlightClass) === 'string') {
      highlightClass += (' ' + targetElement.highlightClass);
    }
    //check for options highlight class
    if (typeof (this._options.highlightClass) === 'string') {
      highlightClass += (' ' + this._options.highlightClass);
    }

    if (oldHelperLayer != null) {
      var oldHelperNumberLayer = oldReferenceLayer.querySelector('.introjs-helperNumberLayer'),
          oldtooltipLayer      = oldReferenceLayer.querySelector('.introjs-tooltiptext'),
          oldArrowLayer        = oldReferenceLayer.querySelector('.introjs-arrow'),
          oldtooltipContainer  = oldReferenceLayer.querySelector('.introjs-tooltip'),
          skipTooltipButton    = oldReferenceLayer.querySelector('.introjs-skipbutton'),
          prevTooltipButton    = oldReferenceLayer.querySelector('.introjs-prevbutton'),
          nextTooltipButton    = oldReferenceLayer.querySelector('.introjs-nextbutton');

      //update or reset the helper highlight class
      oldHelperLayer.className = highlightClass;
      //hide the tooltip
      oldtooltipContainer.style.opacity = 0;
      oldtooltipContainer.style.display = "none";

      if (oldHelperNumberLayer != null) {
        var lastIntroItem = this._introItems[(targetElement.step - 2 >= 0 ? targetElement.step - 2 : 0)];

        if (lastIntroItem != null && (this._direction == 'forward' && lastIntroItem.position == 'floating') || (this._direction == 'backward' && targetElement.position == 'floating')) {
          oldHelperNumberLayer.style.opacity = 0;
        }
      }

      //set new position to helper layer
      _setHelperLayerPosition.call(self, oldHelperLayer);
      _setHelperLayerPosition.call(self, oldReferenceLayer);

      //remove `introjs-fixParent` class from the elements
      var fixParents = document.querySelectorAll('.introjs-fixParent');
      if (fixParents && fixParents.length > 0) {
        for (var i = fixParents.length - 1; i >= 0; i--) {
          fixParents[i].className = fixParents[i].className.replace(/introjs-fixParent/g, '').replace(/^\s+|\s+$/g, '');
        };
      }

      //remove old classes if the element still exist
      _removeShowElement();

      //we should wait until the CSS3 transition is competed (it's 0.3 sec) to prevent incorrect `height` and `width` calculation
      if (self._lastShowElementTimer) {
        clearTimeout(self._lastShowElementTimer);
      }
      self._lastShowElementTimer = setTimeout(function() {
        //set current step to the label
        if (oldHelperNumberLayer != null) {
          oldHelperNumberLayer.innerHTML = targetElement.step;
        }
        //set current tooltip text
        oldtooltipLayer.innerHTML = targetElement.intro;
        //set the tooltip position
        oldtooltipContainer.style.display = "block";
        _placeTooltip.call(self, targetElement.element, oldtooltipContainer, oldArrowLayer, oldHelperNumberLayer);

        //change active bullet
        if (self._options.showBullets) {
            oldReferenceLayer.querySelector('.introjs-bullets li > a.active').className = '';
            oldReferenceLayer.querySelector('.introjs-bullets li > a[data-stepnumber="' + targetElement.step + '"]').className = 'active';
        }
        oldReferenceLayer.querySelector('.introjs-progress .introjs-progressbar').setAttribute('style', 'width:' + _getProgress.call(self) + '%;');

        //show the tooltip
        oldtooltipContainer.style.opacity = 1;
        if (oldHelperNumberLayer) oldHelperNumberLayer.style.opacity = 1;

        //reset button focus
        if (typeof skipTooltipButton !== "undefined" && skipTooltipButton != null && /introjs-donebutton/gi.test(skipTooltipButton.className)) {
          // skip button is now "done" button
          skipTooltipButton.focus();
        } else if (typeof nextTooltipButton !== "undefined" && nextTooltipButton != null) {
          //still in the tour, focus on next
          nextTooltipButton.focus();
        }
      }, 350);

      // end of old element if-else condition
    } else {
      var helperLayer       = document.createElement('div'),
          referenceLayer    = document.createElement('div'),
          arrowLayer        = document.createElement('div'),
          tooltipLayer      = document.createElement('div'),
          tooltipTextLayer  = document.createElement('div'),
          bulletsLayer      = document.createElement('div'),
          progressLayer     = document.createElement('div'),
          buttonsLayer      = document.createElement('div');

      helperLayer.className = highlightClass;
      referenceLayer.className = 'introjs-tooltipReferenceLayer';

      //set new position to helper layer
      _setHelperLayerPosition.call(self, helperLayer);
      _setHelperLayerPosition.call(self, referenceLayer);

      //add helper layer to target element
      this._targetElement.appendChild(helperLayer);
      this._targetElement.appendChild(referenceLayer);

      arrowLayer.className = 'introjs-arrow';

      tooltipTextLayer.className = 'introjs-tooltiptext';
      tooltipTextLayer.innerHTML = targetElement.intro;

      bulletsLayer.className = 'introjs-bullets';

      if (this._options.showBullets === false) {
        bulletsLayer.style.display = 'none';
      }

      var ulContainer = document.createElement('ul');

      for (var i = 0, stepsLength = this._introItems.length; i < stepsLength; i++) {
        var innerLi    = document.createElement('li');
        var anchorLink = document.createElement('a');

        anchorLink.onclick = function() {
          self.goToStep(this.getAttribute('data-stepnumber'));
        };

        if (i === (targetElement.step-1)) anchorLink.className = 'active';

        _setAnchorAsButton(anchorLink);
        anchorLink.innerHTML = "&nbsp;";
        anchorLink.setAttribute('data-stepnumber', this._introItems[i].step);

        innerLi.appendChild(anchorLink);
        ulContainer.appendChild(innerLi);
      }

      bulletsLayer.appendChild(ulContainer);

      progressLayer.className = 'introjs-progress';

      if (this._options.showProgress === false) {
        progressLayer.style.display = 'none';
      }
      var progressBar = document.createElement('div');
      progressBar.className = 'introjs-progressbar';
      progressBar.setAttribute('style', 'width:' + _getProgress.call(this) + '%;');

      progressLayer.appendChild(progressBar);

      buttonsLayer.className = 'introjs-tooltipbuttons';
      if (this._options.showButtons === false) {
        buttonsLayer.style.display = 'none';
      }

      tooltipLayer.className = 'introjs-tooltip';
      tooltipLayer.appendChild(tooltipTextLayer);
      tooltipLayer.appendChild(bulletsLayer);
      tooltipLayer.appendChild(progressLayer);

      //add helper layer number
      if (this._options.showStepNumbers == true) {
        var helperNumberLayer = document.createElement('span');
        helperNumberLayer.className = 'introjs-helperNumberLayer';
        helperNumberLayer.innerHTML = targetElement.step;
        referenceLayer.appendChild(helperNumberLayer);
      }

      tooltipLayer.appendChild(arrowLayer);
      referenceLayer.appendChild(tooltipLayer);

      //next button
      var nextTooltipButton = document.createElement('a');

      nextTooltipButton.onclick = function() {
        if (self._introItems.length - 1 != self._currentStep) {
          _nextStep.call(self);
        }
      };

      _setAnchorAsButton(nextTooltipButton);
      nextTooltipButton.innerHTML = this._options.nextLabel;

      //previous button
      var prevTooltipButton = document.createElement('a');

      prevTooltipButton.onclick = function() {
        if (self._currentStep != 0) {
          _previousStep.call(self);
        }
      };

      _setAnchorAsButton(prevTooltipButton);
      prevTooltipButton.innerHTML = this._options.prevLabel;

      //skip button
      var skipTooltipButton = document.createElement('a');
      skipTooltipButton.className = 'introjs-button introjs-skipbutton';
      _setAnchorAsButton(skipTooltipButton);
      skipTooltipButton.innerHTML = this._options.skipLabel;

      skipTooltipButton.onclick = function() {
        if (self._introItems.length - 1 == self._currentStep && typeof (self._introCompleteCallback) === 'function') {
          self._introCompleteCallback.call(self);
        }

        _exitIntro.call(self, self._targetElement);
      };

      buttonsLayer.appendChild(skipTooltipButton);

      //in order to prevent displaying next/previous button always
      if (this._introItems.length > 1) {
        buttonsLayer.appendChild(prevTooltipButton);
        buttonsLayer.appendChild(nextTooltipButton);
      }

      tooltipLayer.appendChild(buttonsLayer);

      //set proper position
      _placeTooltip.call(self, targetElement.element, tooltipLayer, arrowLayer, helperNumberLayer);

      //end of new element if-else condition
    }

    //disable interaction
    if (this._options.disableInteraction === true) {
      _disableInteraction.call(self);
    }

    if (typeof nextTooltipButton !== "undefined" && nextTooltipButton != null) {
      nextTooltipButton.removeAttribute('tabIndex');
    }
    if (typeof prevTooltipButton !== "undefined" && prevTooltipButton != null) {
      prevTooltipButton.removeAttribute('tabIndex');
    }

    // when it's the first step of tour
    if (this._currentStep == 0 && this._introItems.length > 1) {
      if (typeof skipTooltipButton !== "undefined" && skipTooltipButton != null) {
        skipTooltipButton.className = 'introjs-button introjs-skipbutton';
      }
      if (typeof nextTooltipButton !== "undefined" && nextTooltipButton != null) {
        nextTooltipButton.className = 'introjs-button introjs-nextbutton';
      }

      if (this._options.hidePrev == true) {
        if (typeof prevTooltipButton !== "undefined" && prevTooltipButton != null) {
          prevTooltipButton.className = 'introjs-button introjs-prevbutton introjs-hidden';
        }
        if (typeof nextTooltipButton !== "undefined" && nextTooltipButton != null) {
          nextTooltipButton.className += ' introjs-fullbutton';
        }
      } else {
        if (typeof prevTooltipButton !== "undefined" && prevTooltipButton != null) {
          prevTooltipButton.className = 'introjs-button introjs-prevbutton introjs-disabled';
        }
      }

      if (typeof prevTooltipButton !== "undefined" && prevTooltipButton != null) {
        prevTooltipButton.tabIndex = '-1';
      }
      if (typeof skipTooltipButton !== "undefined" && skipTooltipButton != null) {
        skipTooltipButton.innerHTML = this._options.skipLabel;
      }
    } else if (this._introItems.length - 1 == this._currentStep || this._introItems.length == 1) {
      // last step of tour
      if (typeof skipTooltipButton !== "undefined" && skipTooltipButton != null) {
        skipTooltipButton.innerHTML = this._options.doneLabel;
        // adding donebutton class in addition to skipbutton
        skipTooltipButton.className += ' introjs-donebutton';
      }
      if (typeof prevTooltipButton !== "undefined" && prevTooltipButton != null) {
        prevTooltipButton.className = 'introjs-button introjs-prevbutton';
      }

      if (this._options.hideNext == true) {
        if (typeof nextTooltipButton !== "undefined" && nextTooltipButton != null) {
          nextTooltipButton.className = 'introjs-button introjs-nextbutton introjs-hidden';
        }
        if (typeof prevTooltipButton !== "undefined" && prevTooltipButton != null) {
          prevTooltipButton.className += ' introjs-fullbutton';
        }
      } else {
        if (typeof nextTooltipButton !== "undefined" && nextTooltipButton != null) {
          nextTooltipButton.className = 'introjs-button introjs-nextbutton introjs-disabled';
        }
      }

      if (typeof nextTooltipButton !== "undefined" && nextTooltipButton != null) {
        nextTooltipButton.tabIndex = '-1';
      }
    } else {
      // steps between start and end
      if (typeof skipTooltipButton !== "undefined" && skipTooltipButton != null) {
        skipTooltipButton.className = 'introjs-button introjs-skipbutton';
      }
      if (typeof prevTooltipButton !== "undefined" && prevTooltipButton != null) {
        prevTooltipButton.className = 'introjs-button introjs-prevbutton';
      }
      if (typeof nextTooltipButton !== "undefined" && nextTooltipButton != null) {
        nextTooltipButton.className = 'introjs-button introjs-nextbutton';
      }
      if (typeof skipTooltipButton !== "undefined" && skipTooltipButton != null) {
        skipTooltipButton.innerHTML = this._options.skipLabel;
      }
    }

    //Set focus on "next" button, so that hitting Enter always moves you onto the next step
    if (typeof nextTooltipButton !== "undefined" && nextTooltipButton != null) {
      nextTooltipButton.focus();
    }

    //Pass in whichever helperlayer we're using because _removeShowElement strips the child node classes
    _setShowElement(targetElement, helperLayer || oldHelperLayer);

    if (!_elementInViewport(targetElement.element) && this._options.scrollToElement === true) {
      var rect = targetElement.element.getBoundingClientRect(),
        winHeight = _getWinSize().height,
        top = rect.bottom - (rect.bottom - rect.top),
        bottom = rect.bottom - winHeight;

      //Scroll up
      if (top < 0 || targetElement.element.clientHeight > winHeight) {
        window.scrollBy(0, top - this._options.scrollPadding); // 30px padding from edge to look nice

      //Scroll down
      } else {
        window.scrollBy(0, bottom + 70 + this._options.scrollPadding); // 70px + 30px padding from edge to look nice
      }
    }

    if (typeof (this._introAfterChangeCallback) !== 'undefined') {
      this._introAfterChangeCallback.call(this, targetElement.element);
    }
  }