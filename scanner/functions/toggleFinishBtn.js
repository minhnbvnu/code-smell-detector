function toggleFinishBtn(enable) {
        if (enable === true) {
          self.finishButton.parent().attr('aria-disabled', false).removeClass('disabled');
          self.finishButton
            .removeClass('default-cursor disabled');
        } else {
          self.finishButton.parent().attr('aria-disabled', true).addClass('disabled');
          self.finishButton
            .addClass('default-cursor disabled');
        }
      }