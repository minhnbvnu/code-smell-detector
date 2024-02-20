function _renderDate ($$, year, month, day, format) {
  if (year) {
    if (month) {
      if (day) {
        return year + ' ' + _renderMonth(month, format) + ' ' + day
      } else {
        return year + ' ' + _renderMonth(month, format)
      }
    } else {
      return year
    }
  }
}