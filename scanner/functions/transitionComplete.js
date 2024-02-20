function transitionComplete() {
            if (transitionComplete.x) return;
            transitionComplete.x = true;

            enteringEle.off(TRANSITIONEND_EVENT, completeOnTransitionEnd);
            $timeout.cancel(enteringEle.data(DATA_FALLBACK_TIMER));
            leavingEle && $timeout.cancel(leavingEle.data(DATA_FALLBACK_TIMER));

            // resolve that this one transition (there could be many w/ nested views)
            deferred && deferred.resolve(navViewCtrl);

            // the most recent transition added has completed and all the active
            // transition promises should be added to the services array of promises
            if (transitionId === transitionCounter) {
              $q.all(transitionPromises).then(ionicViewSwitcher.transitionEnd);

              // emit that the views have finished transitioning
              // each parent nav-view will update which views are active and cached
              switcher.emit('after', enteringData, leavingData);
              switcher.cleanup(enteringData);
            }

            // tell the nav bars that the transition has ended
            $ionicNavBarDelegate._instances.forEach(function(instance) {
              instance.triggerTransitionEnd();
            });


            // remove any references that could cause memory issues
            nextTransition = nextDirection = enteringView = leavingView = enteringEle = leavingEle = null;
          }