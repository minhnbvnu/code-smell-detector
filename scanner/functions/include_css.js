function include_css (arg) {
    if (arg) {
        var src   = strip_cdata (arg),
            _head = document.head || document.getElementsByTagName('head')[0] || document.documentElement,
            style = document.createElement ('style');

        style.setAttribute ('type', 'text/css');
        if (style.styleSheet){
            style.styleSheet.cssText = src;
        } else {
            style.appendChild (document.createTextNode (src));
        }

        _head.appendChild (style);
        dbg_trace ('Style: ' + src.substring (0, 100));
    }
}