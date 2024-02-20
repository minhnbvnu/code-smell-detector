function _extractDateFromCSLJSON (source) {
  let date = {}
  if (source.issued && source.issued['date-parts']) {
    let CSLdate = source.issued['date-parts']
    if (CSLdate.length > 0) {
      date.year = String(CSLdate[0][0])
      if (CSLdate[0][1]) {
        date.month = CSLdate[0][1] > 9 ? String(CSLdate[0][1]) : 0 + String(CSLdate[0][1])
      }
      if (CSLdate[0][2]) {
        date.day = CSLdate[0][2] > 9 ? String(CSLdate[0][2]) : 0 + String(CSLdate[0][2])
      }
    }
  }
  return date
}