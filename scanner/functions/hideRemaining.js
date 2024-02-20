function hideRemaining(currentInput, indicator) {

        if (options.alwaysShow) {
          return;
        }

        indicator.css({
          display: 'none'
        });
        currentInput.trigger('maxlength.hidden');
      }