function getOuterRect(el, origin) {
    var offset = el.offset();
    var left = offset.left - (origin ? origin.left : 0);
    var top = offset.top - (origin ? origin.top : 0);
    return {
        left: left,
        right: left + el.outerWidth(),
        top: top,
        bottom: top + el.outerHeight()
    };
}