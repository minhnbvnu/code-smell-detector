function setTransform(el, offset) {
    const pos = offset || new Point(0, 0);
    el.style[TRANSFORM] =
        Browser.any3d ?
            'translate3d(' + pos.x + 'px,' + pos.y + 'px,0px)' :
            'translate(' + pos.x + 'px,' + pos.y + 'px)';

    return this;
}