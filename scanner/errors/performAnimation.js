function performAnimation(animationEvent, className, element, parentElement, afterElement, domOperation, options, doneCallback) {
        var noopCancel = noop;
        var runner = animationRunner(element, animationEvent, className, options);
        if (!runner) {
          fireDOMOperation();
          fireBeforeCallbackAsync();
          fireAfterCallbackAsync();
          closeAnimation();
          return noopCancel;
        }

        animationEvent = runner.event;
        className = runner.className;
        var elementEvents = angular.element._data(runner.node);
        elementEvents = elementEvents && elementEvents.events;

        if (!parentElement) {
          parentElement = afterElement ? afterElement.parent() : element.parent();
        }

        //skip the animation if animations are disabled, a parent is already being animated,
        //the element is not currently attached to the document body or then completely close
        //the animation if any matching animations are not found at all.
        //NOTE: IE8 + IE9 should close properly (run closeAnimation()) in case an animation was found.
        if (animationsDisabled(element, parentElement)) {
          fireDOMOperation();
          fireBeforeCallbackAsync();
          fireAfterCallbackAsync();
          closeAnimation();
          return noopCancel;
        }

        var ngAnimateState  = element.data(NG_ANIMATE_STATE) || {};
        var runningAnimations     = ngAnimateState.active || {};
        var totalActiveAnimations = ngAnimateState.totalActive || 0;
        var lastAnimation         = ngAnimateState.last;
        var skipAnimation = false;

        if (totalActiveAnimations > 0) {
          var animationsToCancel = [];
          if (!runner.isClassBased) {
            if (animationEvent == 'leave' && runningAnimations['ng-leave']) {
              skipAnimation = true;
            } else {
              //cancel all animations when a structural animation takes place
              for (var klass in runningAnimations) {
                animationsToCancel.push(runningAnimations[klass]);
              }
              ngAnimateState = {};
              cleanup(element, true);
            }
          } else if (lastAnimation.event == 'setClass') {
            animationsToCancel.push(lastAnimation);
            cleanup(element, className);
          }
          else if (runningAnimations[className]) {
            var current = runningAnimations[className];
            if (current.event == animationEvent) {
              skipAnimation = true;
            } else {
              animationsToCancel.push(current);
              cleanup(element, className);
            }
          }

          if (animationsToCancel.length > 0) {
            forEach(animationsToCancel, function(operation) {
              operation.cancel();
            });
          }
        }

        if (runner.isClassBased
            && !runner.isSetClassOperation
            && animationEvent != 'animate'
            && !skipAnimation) {
          skipAnimation = (animationEvent == 'addClass') == element.hasClass(className); //opposite of XOR
        }

        if (skipAnimation) {
          fireDOMOperation();
          fireBeforeCallbackAsync();
          fireAfterCallbackAsync();
          fireDoneCallbackAsync();
          return noopCancel;
        }

        runningAnimations     = ngAnimateState.active || {};
        totalActiveAnimations = ngAnimateState.totalActive || 0;

        if (animationEvent == 'leave') {
          //there's no need to ever remove the listener since the element
          //will be removed (destroyed) after the leave animation ends or
          //is cancelled midway
          element.one('$destroy', function(e) {
            var element = angular.element(this);
            var state = element.data(NG_ANIMATE_STATE);
            if (state) {
              var activeLeaveAnimation = state.active['ng-leave'];
              if (activeLeaveAnimation) {
                activeLeaveAnimation.cancel();
                cleanup(element, 'ng-leave');
              }
            }
          });
        }

        //the ng-animate class does nothing, but it's here to allow for
        //parent animations to find and cancel child animations when needed
        $$jqLite.addClass(element, NG_ANIMATE_CLASS_NAME);
        if (options && options.tempClasses) {
          forEach(options.tempClasses, function(className) {
            $$jqLite.addClass(element, className);
          });
        }

        var localAnimationCount = globalAnimationCounter++;
        totalActiveAnimations++;
        runningAnimations[className] = runner;

        element.data(NG_ANIMATE_STATE, {
          last: runner,
          active: runningAnimations,
          index: localAnimationCount,
          totalActive: totalActiveAnimations
        });

        //first we run the before animations and when all of those are complete
        //then we perform the DOM operation and run the next set of animations
        fireBeforeCallbackAsync();
        runner.before(function(cancelled) {
          var data = element.data(NG_ANIMATE_STATE);
          cancelled = cancelled ||
                        !data || !data.active[className] ||
                        (runner.isClassBased && data.active[className].event != animationEvent);

          fireDOMOperation();
          if (cancelled === true) {
            closeAnimation();
          } else {
            fireAfterCallbackAsync();
            runner.after(closeAnimation);
          }
        });

        return runner.cancel;

        function fireDOMCallback(animationPhase) {
          var eventName = '$animate:' + animationPhase;
          if (elementEvents && elementEvents[eventName] && elementEvents[eventName].length > 0) {
            $$asyncCallback(function() {
              element.triggerHandler(eventName, {
                event: animationEvent,
                className: className
              });
            });
          }
        }

        function fireBeforeCallbackAsync() {
          fireDOMCallback('before');
        }

        function fireAfterCallbackAsync() {
          fireDOMCallback('after');
        }

        function fireDoneCallbackAsync() {
          fireDOMCallback('close');
          doneCallback();
        }

        //it is less complicated to use a flag than managing and canceling
        //timeouts containing multiple callbacks.
        function fireDOMOperation() {
          if (!fireDOMOperation.hasBeenRun) {
            fireDOMOperation.hasBeenRun = true;
            domOperation();
          }
        }

        function closeAnimation() {
          if (!closeAnimation.hasBeenRun) {
            if (runner) { //the runner doesn't exist if it fails to instantiate
              runner.applyStyles();
            }

            closeAnimation.hasBeenRun = true;
            if (options && options.tempClasses) {
              forEach(options.tempClasses, function(className) {
                $$jqLite.removeClass(element, className);
              });
            }

            var data = element.data(NG_ANIMATE_STATE);
            if (data) {

              /* only structural animations wait for reflow before removing an
                 animation, but class-based animations don't. An example of this
                 failing would be when a parent HTML tag has a ng-class attribute
                 causing ALL directives below to skip animations during the digest */
              if (runner && runner.isClassBased) {
                cleanup(element, className);
              } else {
                $$asyncCallback(function() {
                  var data = element.data(NG_ANIMATE_STATE) || {};
                  if (localAnimationCount == data.index) {
                    cleanup(element, className, animationEvent);
                  }
                });
                element.data(NG_ANIMATE_STATE, data);
              }
            }
            fireDoneCallbackAsync();
          }
        }
      }