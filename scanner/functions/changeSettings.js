function changeSettings(newsettings) {
        _updateSettings(newsettings);
        _checkValue();

        var value = elements.input.val();

        if (value !== '') {
          value = Number(settings.callback_before_calculation(elements.input.val()));
          elements.input.val(settings.callback_after_calculation(Number(value).toFixed(settings.decimals)));
        }
      }