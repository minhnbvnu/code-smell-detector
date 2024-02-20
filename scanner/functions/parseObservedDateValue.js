function parseObservedDateValue(val) {
      return isDefined(val) && !isDate(val) ? parseDate(val) || undefined : val;
    }