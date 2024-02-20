function addHexColor(futureColor, pastColor, event) {
  event.hexcolor = isFuture(event) ? futureColor : pastColor
  return event
}