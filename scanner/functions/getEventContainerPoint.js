function getEventContainerPoint(ev, dom) {
    if (!ev) {
        ev = window.event;
    }
    let domPos = dom.__position;
    if (!domPos) {
        domPos = computeDomPosition(dom);
    }
    // div by scaleX, scaleY to fix #450
    return new Point(
        (ev.clientX - domPos[0] - dom.clientLeft) / domPos[2],
        (ev.clientY - domPos[1] - dom.clientTop) / domPos[3]
    );
}