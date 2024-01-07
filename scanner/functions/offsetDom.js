function offsetDom(dom, offset) {
    if (!dom) {
        return null;
    }

    if (Browser.any3d) {
        setTransform(dom, offset);
    } else {
        dom.style.left = offset.x + 'px';
        dom.style.top = offset.y + 'px';
    }
    return offset;
}