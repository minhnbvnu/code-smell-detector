function isSimpleClick(event) {
  var modifier = event.shiftKey || event.metaKey || event.altKey || event.ctrlKey,
      secondaryClick = event.which > 1; // IE9 may return undefined

  return !modifier && !secondaryClick;
}