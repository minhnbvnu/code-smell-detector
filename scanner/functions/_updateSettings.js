function _updateSettings(newsettings) {
        settings = $.extend({}, settings, newsettings);

        // Update postfix and prefix texts if those settings were changed.
        if (newsettings.postfix) {
          var $postfix = originalinput.parent().find('.bootstrap-touchspin-postfix');

          if ($postfix.length === 0) {
            _detached_postfix.insertAfter(originalinput);
          }

          originalinput.parent().find('.bootstrap-touchspin-postfix .input-group-text').text(newsettings.postfix);
        }

        if (newsettings.prefix) {
          var $prefix = originalinput.parent().find('.bootstrap-touchspin-prefix');

          if ($prefix.length === 0) {
            _detached_prefix.insertBefore(originalinput);
          }

          originalinput.parent().find('.bootstrap-touchspin-prefix .input-group-text').text(newsettings.prefix);
        }

        _hideEmptyPrefixPostfix();
      }