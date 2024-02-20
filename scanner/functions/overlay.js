function overlay(x, y, w, h) {
    var div = doc.createElement('div'),
    s = div.style;
    s.top = y + 'px';
    s.left = x + 'px';
    s.width = w + 'px';
    s.height = h + 'px';
    s.color = '#fff';
    s.zIndex = 100;
    s.position = 'absolute';
    s.backgroundColor = '#000';
    s.opacity = 0.7;
    return div;
}