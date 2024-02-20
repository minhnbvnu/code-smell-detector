function showRemaining(currentInput, indicator) {
        indicator.css({
          display: 'block'
        });
        currentInput.trigger('maxlength.shown');
      }