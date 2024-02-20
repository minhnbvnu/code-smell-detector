function placeWithCSS(placement, maxLengthIndicator) {
        if (!placement || !maxLengthIndicator) {
          return;
        }

        var POSITION_KEYS = [
          'top',
          'bottom',
          'left',
          'right',
          'position'
        ];

        var cssPos = {};

        // filter css properties to position
        $.each(POSITION_KEYS, function (i, key) {
          var val = options.placement[key];
          if (typeof val !== 'undefined') {
            cssPos[key] = val;
          }
        });

        maxLengthIndicator.css(cssPos);

        return;
      }