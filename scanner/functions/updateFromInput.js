function updateFromInput(input, preserveInputValue) {
    var hex, hsb, opacity, keywords, alpha, value, x, y, r, phi;

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

    // Determine hex/HSB values
    if(isRgb(input.val())) {
      // If input value is a rgb(a) string, convert it to hex color and update opacity
      hex = rgbString2hex(input.val());
      alpha = keepWithin(parseFloat(getAlpha(input.val())).toFixed(2), 0, 1);
      if(alpha) {
        input.attr('data-opacity', alpha);
      }
    } else {
      hex = convertCase(parseHex(input.val(), true), settings.letterCase);
    }

    if(!hex){
      hex = convertCase(parseInput(settings.defaultValue, true), settings.letterCase);
    }
    hsb = hex2hsb(hex);

    // Get array of lowercase keywords
    keywords = !settings.keywords ? [] : $.map(settings.keywords.split(','), function(a) {
      return a.toLowerCase().trim();
    });

    // Set color string
    if(input.val() !== '' && $.inArray(input.val().toLowerCase(), keywords) > -1) {
      value = convertCase(input.val());
    } else {
      value = isRgb(input.val()) ? parseRgb(input.val()) : hex;
    }

    // Update input value
    if(!preserveInputValue) input.val(value);

    // Determine opacity value
    if(settings.opacity) {
      // Get from data-opacity attribute and keep within 0-1 range
      opacity = input.attr('data-opacity') === '' ? 1 : keepWithin(parseFloat(input.attr('data-opacity')).toFixed(2), 0, 1);
      if(isNaN(opacity)) opacity = 1;
      input.attr('data-opacity', opacity);
      swatch.find('span').css('opacity', String(opacity));

      // Set opacity picker position
      y = keepWithin(opacitySlider.height() - (opacitySlider.height() * opacity), 0, opacitySlider.height());
      opacityPicker.css('top', y + 'px');
    }

    // Set opacity to zero if input value is transparent
    if(input.val().toLowerCase() === 'transparent') {
      swatch.find('span').css('opacity', String(0));
    }

    // Update swatch
    swatch.find('span').css('backgroundColor', hex);

    // Determine picker locations
    switch(settings.control) {
      case 'wheel':
        // Set grid position
        r = keepWithin(Math.ceil(hsb.s * 0.75), 0, grid.height() / 2);
        phi = hsb.h * Math.PI / 180;
        x = keepWithin(75 - Math.cos(phi) * r, 0, grid.width());
        y = keepWithin(75 - Math.sin(phi) * r, 0, grid.height());
        gridPicker.css({
          top: y + 'px',
          left: x + 'px'
        });

        // Set slider position
        y = 150 - (hsb.b / (100 / grid.height()));
        if(hex === '') y = 0;
        sliderPicker.css('top', y + 'px');
        
        // Update panel color
        slider.css('backgroundColor', hsb2hex({ h: hsb.h, s: hsb.s, b: 100 }));
        break;

      case 'saturation':
        // Set grid position
        x = keepWithin((5 * hsb.h) / 12, 0, 150);
        y = keepWithin(grid.height() - Math.ceil(hsb.b / (100 / grid.height())), 0, grid.height());
        gridPicker.css({
          top: y + 'px',
          left: x + 'px'
        });

        // Set slider position
        y = keepWithin(slider.height() - (hsb.s * (slider.height() / 100)), 0, slider.height());
        sliderPicker.css('top', y + 'px');

        // Update UI
        slider.css('backgroundColor', hsb2hex({ h: hsb.h, s: 100, b: hsb.b }));
        minicolors.find('.minicolors-grid-inner').css('opacity', hsb.s / 100);
        break;

      case 'brightness':
        // Set grid position
        x = keepWithin((5 * hsb.h) / 12, 0, 150);
        y = keepWithin(grid.height() - Math.ceil(hsb.s / (100 / grid.height())), 0, grid.height());
        gridPicker.css({
          top: y + 'px',
          left: x + 'px'
        });

        // Set slider position
        y = keepWithin(slider.height() - (hsb.b * (slider.height() / 100)), 0, slider.height());
        sliderPicker.css('top', y + 'px');

        // Update UI
        slider.css('backgroundColor', hsb2hex({ h: hsb.h, s: hsb.s, b: 100 }));
        minicolors.find('.minicolors-grid-inner').css('opacity', 1 - (hsb.b / 100));
        break;

      default:
        // Set grid position
        x = keepWithin(Math.ceil(hsb.s / (100 / grid.width())), 0, grid.width());
        y = keepWithin(grid.height() - Math.ceil(hsb.b / (100 / grid.height())), 0, grid.height());
        gridPicker.css({
          top: y + 'px',
          left: x + 'px'
        });

        // Set slider position
        y = keepWithin(slider.height() - (hsb.h / (360 / slider.height())), 0, slider.height());
        sliderPicker.css('top', y + 'px');

        // Update panel color
        grid.css('backgroundColor', hsb2hex({ h: hsb.h, s: 100, b: 100 }));
        break;
    }

    // Fire change event, but only if minicolors is fully initialized
    if(input.data('minicolors-initialized')) {
      doChange(input, value, opacity);
    }
  }