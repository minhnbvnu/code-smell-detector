function updateView(firstTime) {
          // get the current local according to the $state
          var viewLocals = $state.$current && $state.$current.locals[viewData.name];

          // do not update THIS nav-view if its is not the container for the given state
          // if the viewLocals are the same as THIS latestLocals, then nothing to do
          if (!viewLocals || (!firstTime && viewLocals === latestLocals)) return;

          // update the latestLocals
          latestLocals = viewLocals;
          viewData.state = viewLocals.$$state;

          // register, update and transition to the new view
          navViewCtrl.register(viewLocals);
        }