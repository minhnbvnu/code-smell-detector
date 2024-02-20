function alterPositionStyles() {
          var style = getState(element).style;

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