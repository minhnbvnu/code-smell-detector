function is_link_path_loaded (e) {
    var path = e.getAttribute ('href');
    if (!path) return false;
    
    var sts  = document.styleSheets, i, len = sts.length;
    for (i = 0; i < len; i++) {
        if (sts[i].href == path) return true;
    }

    return false;
}