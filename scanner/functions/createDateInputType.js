function createDateInputType(type, regexp, parseDate, format) {
  return function dynamicDateInputType(scope, element, attr, ctrl, $sniffer, $browser, $filter) {
    badInputChecker(scope, element, attr, ctrl);
    baseInputType(scope, element, attr, ctrl, $sniffer, $browser);
    var timezone = ctrl && ctrl.$options && ctrl.$options.timezone;
    var previousDate;

    ctrl.$$parserName = type;
    ctrl.$parsers.push(function(value) {
      if (ctrl.$isEmpty(value)) return null;
      if (regexp.test(value)) {
        // Note: We cannot read ctrl.$modelValue, as there might be a different
        // parser/formatter in the processing chain so that the model
        // contains some different data format!
        var parsedDate = parseDate(value, previousDate);
        if (timezone) {
          parsedDate = convertTimezoneToLocal(parsedDate, timezone);
        }
        return parsedDate;
      }
      return undefined;
    });

    ctrl.$formatters.push(function(value) {
      if (value && !isDate(value)) {
        throw ngModelMinErr('datefmt', 'Expected `{0}` to be a date', value);
      }
      if (isValidDate(value)) {
        previousDate = value;
        if (previousDate && timezone) {
          previousDate = convertTimezoneToLocal(previousDate, timezone, true);
        }
        return $filter('date')(value, format, timezone);
      } else {
        previousDate = null;
        return '';
      }
    });

    if (isDefined(attr.min) || attr.ngMin) {
      var minVal;
      ctrl.$validators.min = function(value) {
        return !isValidDate(value) || isUndefined(minVal) || parseDate(value) >= minVal;
      };
      attr.$observe('min', function(val) {
        minVal = parseObservedDateValue(val);
        ctrl.$validate();
      });
    }

    if (isDefined(attr.max) || attr.ngMax) {
      var maxVal;
      ctrl.$validators.max = function(value) {
        return !isValidDate(value) || isUndefined(maxVal) || parseDate(value) <= maxVal;
      };
      attr.$observe('max', function(val) {
        maxVal = parseObservedDateValue(val);
        ctrl.$validate();
      });
    }

    function isValidDate(value) {
      // Invalid Date: getTime() returns NaN
      return value && !(value.getTime && value.getTime() !== value.getTime());
    }

    function parseObservedDateValue(val) {
      return isDefined(val) && !isDate(val) ? parseDate(val) || undefined : val;
    }
  };
}