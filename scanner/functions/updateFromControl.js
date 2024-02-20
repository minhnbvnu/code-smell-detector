function updateFromControl(input, target) {

    function getCoords(picker, container) {
      var left, top;
      if(!picker.length || !container) return null;
      left = picker.offset().left;
      top = picker.offset().top;

      return {
        x: left - container.offset().left + (picker.outerWidth() / 2),
        y: top - container.offset().top + (picker.outerHeight() / 2)
      };
    }

    var hue, saturation, brightness, x, y, r, phi;
    var hex = input.val();
    var opacity = input.attr('data-opacity');

    // Helpful references
    var minicolors = input.parent();
    var settings = input.data('minicolors-settings');
    var swatch = minicolors.find('.minicolors-input-swatch');

    // Panel objects
    var grid = minicolors.find('.minicolors-grid');
    var slider = minicolors.find('.minicolors-slider');
    var opacitySlider = minicolors.find('.minicolors-opacity-slider');

    // Picker objects
    var gridPicker = grid.find('[class$=-picker]');
    var sliderPicker = slider.find('[class$=-picker]');
    var opacityPicker = opacitySlider.find('[class$=-picker]');

    // Picker positions
    var gridPos = getCoords(gridPicker, grid);
    var sliderPos = getCoords(sliderPicker, slider);
    var opacityPos = getCoords(opacityPicker, opacitySlider);

    // Handle colors
    if(target.is('.minicolors-grid, .minicolors-slider, .minicolors-opacity-slider')) {

      // Determine HSB values
      switch(settings.control) {
        case 'wheel':
          // Calculate hue, saturation, and brightness
          x = (grid.width() / 2) - gridPos.x;
          y = (grid.height() / 2) - gridPos.y;
          r = Math.sqrt(x * x + y * y);
          phi = Math.atan2(y, x);
          if(phi < 0) phi += Math.PI * 2;
          if(r > 75) {
            r = 75;
            gridPos.x = 69 - (75 * Math.cos(phi));
            gridPos.y = 69 - (75 * Math.sin(phi));
          }
          saturation = keepWithin(r / 0.75, 0, 100);
          hue = keepWithin(phi * 180 / Math.PI, 0, 360);
          brightness = keepWithin(100 - Math.floor(sliderPos.y * (100 / slider.height())), 0, 100);
          hex = hsb2hex({
            h: hue,
            s: saturation,
            b: brightness
          });

          // Update UI
          slider.css('backgroundColor', hsb2hex({ h: hue, s: saturation, b: 100 }));
          break;

        case 'saturation':
          // Calculate hue, saturation, and brightness
          hue = keepWithin(parseInt(gridPos.x * (360 / grid.width()), 10), 0, 360);
          saturation = keepWithin(100 - Math.floor(sliderPos.y * (100 / slider.height())), 0, 100);
          brightness = keepWithin(100 - Math.floor(gridPos.y * (100 / grid.height())), 0, 100);
          hex = hsb2hex({
            h: hue,
            s: saturation,
            b: brightness
          });

          // Update UI
          slider.css('backgroundColor', hsb2hex({ h: hue, s: 100, b: brightness }));
          minicolors.find('.minicolors-grid-inner').css('opacity', saturation / 100);
          break;

        case 'brightness':
          // Calculate hue, saturation, and brightness
          hue = keepWithin(parseInt(gridPos.x * (360 / grid.width()), 10), 0, 360);
          saturation = keepWithin(100 - Math.floor(gridPos.y * (100 / grid.height())), 0, 100);
          brightness = keepWithin(100 - Math.floor(sliderPos.y * (100 / slider.height())), 0, 100);
          hex = hsb2hex({
            h: hue,
            s: saturation,
            b: brightness
          });

          // Update UI
          slider.css('backgroundColor', hsb2hex({ h: hue, s: saturation, b: 100 }));
          minicolors.find('.minicolors-grid-inner').css('opacity', 1 - (brightness / 100));
          break;

        default:
          // Calculate hue, saturation, and brightness
          hue = keepWithin(360 - parseInt(sliderPos.y * (360 / slider.height()), 10), 0, 360);
          saturation = keepWithin(Math.floor(gridPos.x * (100 / grid.width())), 0, 100);
          brightness = keepWithin(100 - Math.floor(gridPos.y * (100 / grid.height())), 0, 100);
          hex = hsb2hex({
            h: hue,
            s: saturation,
            b: brightness
          });

          // Update UI
          grid.css('backgroundColor', hsb2hex({ h: hue, s: 100, b: 100 }));
          break;
      }

      // Handle opacity
      if(settings.opacity) {
        opacity = parseFloat(1 - (opacityPos.y / opacitySlider.height())).toFixed(2);
      } else {
        opacity = 1;
      }

      updateInput(input, hex, opacity);
    }
    else {
      // Set swatch color
      swatch.find('span').css({
        backgroundColor: hex,
        opacity: String(opacity)
      });

      // Handle change event
      doChange(input, hex, opacity);
    }
  }