function getVector(event, canvas) {
  var x = event.clientX - document.documentElement.scrollLeft - canvas.offsetLeft;
  var y = event.clientY - document.documentElement.scrollTop - canvas.offsetTop;
  return Vector(x, y);
}