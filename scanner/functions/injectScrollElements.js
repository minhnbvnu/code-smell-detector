function injectScrollElements() {
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

        function getLeftTopBottomRightCssText(left, top, bottom, right) {
          left = !left ? '0' : left + 'px';
          top = !top ? '0' : top + 'px';
          bottom = !bottom ? '0' : bottom + 'px';
          right = !right ? '0' : right + 'px';

          return 'left: ' + left + '; top: ' + top + '; right: ' + right + '; bottom: ' + bottom + ';';
        }

        debug('Injecting elements');

        if (!getState(element)) {
          debug('Aborting because element has been uninstalled');
          return;
        }

        alterPositionStyles();

        var rootContainer = getState(element).container;

        if (!rootContainer) {
          rootContainer = injectContainerElement();
        }

        // Due to this WebKit bug https://bugs.webkit.org/show_bug.cgi?id=80808 (currently fixed in Blink, but still present in WebKit browsers such as Safari),
        // we need to inject two containers, one that is width/height 100% and another that is left/top -1px so that the final container always is 1x1 pixels bigger than
        // the targeted element.
        // When the bug is resolved, "containerContainer" may be removed.

        // The outer container can occasionally be less wide than the targeted when inside inline elements element in WebKit (see https://bugs.webkit.org/show_bug.cgi?id=152980).
        // This should be no problem since the inner container either way makes sure the injected scroll elements are at least 1x1 px.

        var scrollbarWidth = scrollbarSizes.width;
        var scrollbarHeight = scrollbarSizes.height;
        var containerContainerStyle =
          'position: absolute; flex: none; overflow: hidden; z-index: -1; visibility: hidden; width: 100%; height: 100%; left: 0px; top: 0px;';
        var containerStyle =
          'position: absolute; flex: none; overflow: hidden; z-index: -1; visibility: hidden; ' +
          getLeftTopBottomRightCssText(
            -(1 + scrollbarWidth),
            -(1 + scrollbarHeight),
            -scrollbarHeight,
            -scrollbarWidth
          );
        var expandStyle =
          'position: absolute; flex: none; overflow: scroll; z-index: -1; visibility: hidden; width: 100%; height: 100%;';
        var shrinkStyle =
          'position: absolute; flex: none; overflow: scroll; z-index: -1; visibility: hidden; width: 100%; height: 100%;';
        var expandChildStyle = 'position: absolute; left: 0; top: 0;';
        var shrinkChildStyle = 'position: absolute; width: 200%; height: 200%;';

        var containerContainer = document.createElement('div');
        var container = document.createElement('div');
        var expand = document.createElement('div');
        var expandChild = document.createElement('div');
        var shrink = document.createElement('div');
        var shrinkChild = document.createElement('div');

        // Some browsers choke on the resize system being rtl, so force it to ltr. https://github.com/wnr/element-resize-detector/issues/56
        // However, dir should not be set on the top level container as it alters the dimensions of the target element in some browsers.
        containerContainer.dir = 'ltr';

        containerContainer.style.cssText = containerContainerStyle;
        containerContainer.className = detectionContainerClass;
        container.className = detectionContainerClass;
        container.style.cssText = containerStyle;
        expand.style.cssText = expandStyle;
        expandChild.style.cssText = expandChildStyle;
        shrink.style.cssText = shrinkStyle;
        shrinkChild.style.cssText = shrinkChildStyle;

        expand.appendChild(expandChild);
        shrink.appendChild(shrinkChild);
        container.appendChild(expand);
        container.appendChild(shrink);
        containerContainer.appendChild(container);
        rootContainer.appendChild(containerContainer);

        function onExpandScroll() {
          getState(element).onExpand && getState(element).onExpand();
        }

        function onShrinkScroll() {
          getState(element).onShrink && getState(element).onShrink();
        }

        addEvent(expand, 'scroll', onExpandScroll);
        addEvent(shrink, 'scroll', onShrinkScroll);

        // Store the event handlers here so that they may be removed when uninstall is called.
        // See uninstall function for an explanation why it is needed.
        getState(element).onExpandScroll = onExpandScroll;
        getState(element).onShrinkScroll = onShrinkScroll;
      }