function findOrCreateContainer(boundingRect) {
    var div = document.getElementById('hypergrid'),
        used = div && !div.firstElementChild;

    if (!used) {
        div = document.createElement('div');
        setStyles(div, boundingRect, RECT_STYLES);
        document.body.appendChild(div);
    }

    return div;
}