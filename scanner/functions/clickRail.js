function clickRail(i) {
  var element = i.element;

  i.event.bind(i.scrollbarY, "mousedown", function (e) {
    return e.stopPropagation();
  });
  i.event.bind(i.scrollbarYRail, "mousedown", function (e) {
    var positionTop =
      e.pageY -
      window.pageYOffset -
      i.scrollbarYRail.getBoundingClientRect().top;
    var direction = positionTop > i.scrollbarYTop ? 1 : -1;

    i.element.scrollTop += direction * i.containerHeight;
    updateGeometry(i);

    e.stopPropagation();
  });

  i.event.bind(i.scrollbarX, "mousedown", function (e) {
    return e.stopPropagation();
  });
  i.event.bind(i.scrollbarXRail, "mousedown", function (e) {
    var positionLeft =
      e.pageX -
      window.pageXOffset -
      i.scrollbarXRail.getBoundingClientRect().left;
    var direction = positionLeft > i.scrollbarXLeft ? 1 : -1;

    i.element.scrollLeft += direction * i.containerWidth;
    updateGeometry(i);

    e.stopPropagation();
  });
}