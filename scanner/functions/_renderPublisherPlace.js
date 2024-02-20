function _renderPublisherPlace ($$, place, publisher) {
  if (place && publisher) {
    return ' ' + place + ': ' + publisher + '; '
  } else if (place) {
    return ' ' + place + '; '
  } else if (publisher) {
    return ' ' + publisher + '; '
  } else {
    return ''
  }
}