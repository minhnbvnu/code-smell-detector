function is_loadchk (e) {
    var cond = e.getAttribute ('data-wi-loadchk');
    if (!cond) return false;
    try {
        return global_eval ('!!(' + cond + ')');
    } catch (err) {
        return false;
    }
}