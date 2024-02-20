function downOnce() {
        _checkValue();

        value = parseFloat(settings.callback_before_calculation(elements.input.val()));

        var initvalue = value;
        var boostedstep;

        if (isNaN(value)) {
          value = valueIfIsNaN();
        } else {
          boostedstep = _getBoostedStep();
          value = value - boostedstep;
        }

        if ((settings.min !== null) && (value < settings.min)) {
          value = settings.min;
          originalinput.trigger('touchspin.on.min');
          stopSpin();
        }

        elements.input.val(settings.callback_after_calculation(Number(value).toFixed(settings.decimals)));

        if (initvalue !== value) {
          originalinput.trigger('change');
        }
      }