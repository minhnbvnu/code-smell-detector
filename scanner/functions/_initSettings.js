function _initSettings() {
        settings = $.extend({}, defaults, originalinput_data, _parseAttributes(), options);
      }