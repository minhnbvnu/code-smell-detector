function all_styles_and_scripts (context) {
    var _found = context.querySelectorAll ('style, link[rel="stylesheet"], script');
    scripts = [];

    var i, len = _found.length;

    for (i = 0; i < len; i++) {
        var e = _found[i];

        switch (e.tagName.toLowerCase()) {
        case 'style':
            if (!is_loadchk (e)) {
                var ef = e.firstChild;
                if (ef) 
                    include_css (ef.textContent || ef.nodeValue || '');
            }
            break;
        case 'link':
            if (!is_loadchk (e) && !is_link_path_loaded (e)) {
                include_css_byref (e.getAttribute ('href'));
            }
            break;
        case 'script':  // save scripts for further load
            if (!is_loadchk (e) && !is_script_path_loaded (e)) {
                scripts.push (e);
            }
        }

        e.parentNode.removeChild (e);
    }
}