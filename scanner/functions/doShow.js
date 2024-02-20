function doShow() {
      popupStack.push(popup);
      $timeout(popup.show, showDelay, false);

      popup.responseDeferred.promise.then(function(result) {
        var index = popupStack.indexOf(popup);
        if (index !== -1) {
          popupStack.splice(index, 1);
        }

        popup.remove();

        if (popupStack.length > 0) {
          popupStack[popupStack.length - 1].show();
        } else {
          $ionicBackdrop.release();
          //Remove popup-open & backdrop if this is last popup
          $timeout(function() {
            // wait to remove this due to a 300ms delay native
            // click which would trigging whatever was underneath this
            if (!popupStack.length) {
              $ionicBody.removeClass('popup-open');
            }
          }, 400, false);
          ($ionicPopup._backButtonActionDone || noop)();
        }


        return result;
      });

    }