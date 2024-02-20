function include_css_byref (ref) {
    var _head = document.head || document.getElementsByTagName ('head')[0] || document.documentElement,
        style = document.createElement ('link');

    style.setAttribute ('rel',  'stylesheet');
    style.setAttribute ('type', 'text/css');
    style.setAttribute ('href', ref);
    _head.appendChild (style);
    dbg_trace ('Link: ' + ref);
}