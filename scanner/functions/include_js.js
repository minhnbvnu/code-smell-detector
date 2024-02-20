function include_js (arg_scr) {
    if (arg_scr) {
        var scr = strip_cdata (arg_scr);  // YQL wraps scripts in CDATA
        try {
            global_eval (scr);
            dbg_trace ('Eval: ' + scr.substring (0, 100));
        } catch (e) {
            dbg_error ('Eval error: ' + e.message + ' ~~~ ' + scr.substring (0, 100));
        }
    }

    next_script ();
}