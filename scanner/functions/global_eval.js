function global_eval (scr) {
    if (scr) {
        /* jshint -W061, -W085 */
        (window.execScript || function (scr) {
            window["eval"].call (window, scr);
        }) (scr);
    }
}