function createShade() {
        return $('<div />').css({
          position: 'absolute',
          backgroundColor: options.shadeColor||options.bgColor
        }).appendTo(holder);
      }