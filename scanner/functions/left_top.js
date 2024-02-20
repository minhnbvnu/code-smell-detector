function left_top(event) {
  /** @type {number} */
  let x;
  /** @type {number} */
  let y;
  if (typeof(event.clientX) != 'undefined') {
    x = event.clientX;
    y = event.clientY;
  }
  else if (typeof(event.screenX) != 'undefined') {
    x = event.screenX;
    y = event.screenY;
  }
  else if (typeof(event.targetTouches) != 'undefined') {
    x = event.targetTouches[0].pageX;
    y = event.targetTouches[0].pageY;
  }
  else if (typeof(event.originalEvent) == 'undefined') {
    console.error("don't understand x and y for " + event.type, event);
  }
  else if (typeof(event.originalEvent.clientX) != 'undefined') {
    x = event.originalEvent.clientX;
    y = event.originalEvent.clientY;
  }
  else if (typeof(event.originalEvent.screenX) != 'undefined') {
    x = event.originalEvent.screenX;
    y = event.originalEvent.screenY;
  }
  else if (typeof(event.originalEvent.targetTouches) != 'undefined') {
    x = event.originalEvent.targetTouches[0].pageX;
    y = event.originalEvent.targetTouches[0].pageY;
  }

  return { left: x, top: y };
}