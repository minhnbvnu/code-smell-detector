function firstInit() {
          var maxlengthContent = updateMaxLengthHTML(currentInput.val(), maxLengthCurrentInput, '0');
          maxLengthCurrentInput = getMaxLength(currentInput);

          if (!maxLengthIndicator) {
            maxLengthIndicator = $('<span class="bootstrap-maxlength"></span>').css({
              display: 'none',
              position: 'absolute',
              whiteSpace: 'nowrap',
              zIndex: options.zIndex
            }).html(maxlengthContent);
          }

          // We need to detect resizes if we are dealing with a textarea:
          if (currentInput.is('textarea')) {
            currentInput.data('maxlenghtsizex', currentInput.outerWidth());
            currentInput.data('maxlenghtsizey', currentInput.outerHeight());

            currentInput.mouseup(function () {
              if (currentInput.outerWidth() !== currentInput.data('maxlenghtsizex') || currentInput.outerHeight() !== currentInput.data('maxlenghtsizey')) {
                place(currentInput, maxLengthIndicator);
              }

              currentInput.data('maxlenghtsizex', currentInput.outerWidth());
              currentInput.data('maxlenghtsizey', currentInput.outerHeight());
            });
          }

          if (options.appendToParent) {
            currentInput.parent().append(maxLengthIndicator);
            currentInput.parent().css('position', 'relative');
          } else {
            documentBody.append(maxLengthIndicator);
          }

          var remaining = remainingChars(currentInput, getMaxLength(currentInput));
          manageRemainingVisibility(remaining, currentInput, maxLengthCurrentInput, maxLengthIndicator);
          place(currentInput, maxLengthIndicator);
        }