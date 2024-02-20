function onObjectLoad() {
            // The object has been loaded, which means that the element now is guaranteed to be attached to the DOM.
            if (!positionCheckPerformed) {
              alterPositionStyles();
            }

            /*jshint validthis: true */

            function getDocument(element, callback) {
              //Opera 12 seem to call the object.onload before the actual document has been created.
              //So if it is not present, poll it with an timeout until it is present.
              //TODO: Could maybe be handled better with object.onreadystatechange or similar.
              if (!element.contentDocument) {
                setTimeout(function checkForObjectDocument() {
                  getDocument(element, callback);
                }, 100);

                return;
              }

              callback(element.contentDocument);
            }

            //Mutating the object element here seems to fire another load event.
            //Mutating the inner document of the object element is fine though.
            var objectElement = this;

            //Create the style element to be added to the object.
            getDocument(objectElement, function onObjectDocumentReady(objectDocument) {
              //Notify that the element is ready to be listened to.
              callback(element);
            });
          }