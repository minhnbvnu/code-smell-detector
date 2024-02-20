function windowListener(e) {
        if (e.relatedTarget === null) {
          jsPanel.pointermove.forEach(function (evt) {
            document.removeEventListener(evt, resizePanel, false);
          });
        }
      }