function getTouchTargetCoords(touch) {
    let totalOffsetX = 0;
    let totalOffsetY = 0;
    let target = touch.target;
    while (!(target instanceof HTMLElement)) {
        target = target.parentNode;
    }
    let currentElement = target;

    do {
        totalOffsetX += currentElement.offsetLeft - currentElement.scrollLeft;
        totalOffsetY += currentElement.offsetTop - currentElement.scrollTop;
        currentElement = currentElement.offsetParent;
    } while (currentElement);

    return {
        x: touch.pageX - totalOffsetX,
        y: touch.pageY - totalOffsetY
    };
}