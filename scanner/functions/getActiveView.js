function getActiveView (body) {
          // check if there is an active modal
          var modal = body.querySelector('ion-modal-view[class*="ng-enter-active"]');
          if (modal != null) {
                   // check if modal is not leaving
                   if (modal.getAttribute('class').indexOf('ng-leave') == -1) {
                      return modal;
                  }
          }
          // get the candidate active views
          var views = body.querySelectorAll('ion-view[nav-view="active"]');

          // only one candidate, so we just take it
          if (views.length === 1) {
            return views[0];
          }

          // convert the NodeList to an array, filter it using 'isActiveView' and return the first element
          return Array.prototype.slice.call(views).filter(function (view) {
            return isActiveView(view);
          })[0];
        }