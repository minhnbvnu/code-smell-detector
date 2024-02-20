function setTimestampFormat(format, timezone) {
      if (!(angular.isUndefined(format) || angular.isString(format))) {
        throw new TypeError('format parameter must be a string or undefined');
      }
      if (!(angular.isUndefined(timezone) || angular.isString(timezone))) {
        throw new TypeError('timezone parameter must be a string or undefined');
      }

      dateFormat = format;
      dateTimezone = timezone;
    }