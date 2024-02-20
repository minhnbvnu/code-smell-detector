function setButtonShown(el, shown) {
            shown() && el.addClass('visible') || el.removeClass('active');
            ionic.requestAnimationFrame(function() {
              shown() && el.addClass('active') || el.removeClass('visible');
            });
          }