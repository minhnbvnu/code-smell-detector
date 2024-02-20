function injectObject(element, callback) {
        var OBJECT_STYLE =
          'display: block; position: absolute; top: 0; left: 0; width: 100%; height: 100%; border: none; padding: 0; margin: 0; opacity: 0; z-index: -1000; pointer-events: none;';

        //The target element needs to be positioned (everything except static) so the absolute positioned object will be positioned relative to the target element.

        // Position altering may be performed directly or on object load, depending on if style resolution is possible directly or not.
        var positionCheckPerformed = false;

        // The element may not yet be attached to the DOM, and therefore the style object may be empty in some browsers.
        // Since the style object is a reference, it will be updated as soon as the element is attached to the DOM.
        var style = window.getComputedStyle(element);
        var width = element.offsetWidth;
        var height = element.offsetHeight;

        getState(element).startSize = {
          width: width,
          height: height,
        };

        function mutateDom() {
          function alterPositionStyles() {
            if (style.position === 'static') {
              element.style.position = 'relative';

              var removeRelativeStyles = function(reporter, element, style, property) {
                function getNumericalValue(value) {
                  return value.replace(/[^-\d\.]/g, '');
                }

                var value = style[property];

                if (value !== 'auto' && getNumericalValue(value) !== '0') {
                  reporter.warn(
                    'An element that is positioned static has style.' +
                      property +
                      '=' +
                      value +
                      ' which is ignored due to the static positioning. The element will need to be positioned relative, so the style.' +
                      property +
                      ' will be set to 0. Element: ',
                    element
                  );
                  element.style[property] = 0;
                }
              };

              //Check so that there are no accidental styles that will make the element styled differently now that is is relative.
              //If there are any, set them to 0 (this should be okay with the user since the style properties did nothing before [since the element was positioned static] anyway).
              removeRelativeStyles(reporter, element, style, 'top');
              removeRelativeStyles(reporter, element, style, 'right');
              removeRelativeStyles(reporter, element, style, 'bottom');
              removeRelativeStyles(reporter, element, style, 'left');
            }
          }

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

          // The element may be detached from the DOM, and some browsers does not support style resolving of detached elements.
          // The alterPositionStyles needs to be delayed until we know the element has been attached to the DOM (which we are sure of when the onObjectLoad has been fired), if style resolution is not possible.
          if (style.position !== '') {
            alterPositionStyles(style);
            positionCheckPerformed = true;
          }

          //Add an object element as a child to the target element that will be listened to for resize events.
          var object = document.createElement('object');
          object.style.cssText = OBJECT_STYLE;
          object.tabIndex = -1;
          object.type = 'text/html';
          object.setAttribute('aria-hidden', 'true');
          object.onload = onObjectLoad;

          //Safari: This must occur before adding the object to the DOM.
          //IE: Does not like that this happens before, even if it is also added after.
          if (!browserDetector.isIE()) {
            object.data = 'about:blank';
          }

          element.appendChild(object);
          getState(element).object = object;

          //IE: This must occur after adding the object to the DOM.
          if (browserDetector.isIE()) {
            object.data = 'about:blank';
          }
        }

        if (batchProcessor) {
          batchProcessor.add(mutateDom);
        } else {
          mutateDom();
        }
      }