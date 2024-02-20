function _renderMonth (month, format) {
  let monthNames
  if (format === 'long') {
    monthNames = [null, 'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
  } else {
    monthNames = [null, 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
  }
  if (month) {
    return monthNames[month] || month
  }
}