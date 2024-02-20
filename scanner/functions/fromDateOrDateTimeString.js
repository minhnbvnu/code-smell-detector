function fromDateOrDateTimeString(aValue, dateProp) {
      if (aLenient) {
        return Time.fromString(aValue, dateProp);
      } else {
        return Time.fromDateTimeString(aValue, dateProp);
      }
    }