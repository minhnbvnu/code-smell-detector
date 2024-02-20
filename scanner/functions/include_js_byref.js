function include_js_byref (url, arg_timeout) {
    // TODO: timeout option
    var timeout = arg_timeout || 10e3,

        script = document.createElement ('script'),
        _done  = false,

        _body  = document.body || document.getElementsByTagName ('body')[0] || document.documentElement;

    // Load events
    script.onreadystatechange = script.onload = function (_unused, is_aborted) {
        if (!_done && 
            (is_aborted || !script.readyState || /loaded|complete/.test (script.readyState))) {

            _done = true;

            if (!is_aborted) dbg_trace ('Script: ' + url);
            next_script ();
        }

        script.onload = script.onreadystatechange = null;
     };

    script.src = url;
    _body.appendChild (script);

    // 404 fallback
    setTimeout (function () {
        if (!_done) {
            dbg_error ('Timeout: ' + url);
            if (script.parentNode)
                script.parentNode.removeChild (script);

            script.onload (null, true);
        }
    }, timeout);
}