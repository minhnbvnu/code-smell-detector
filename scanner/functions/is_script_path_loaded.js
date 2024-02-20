function is_script_path_loaded (e) {
    var path = e.getAttribute ('src');
    if (!path) return false;
    
    var scs  = document.getElementsByTagName ('script'), i, len = scs.length;
    for (i = 0; i < len; i++) {
        if (scs[i].getAttribute('src') == path) return true;
    }

    return false;
}