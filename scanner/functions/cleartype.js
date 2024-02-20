function cleartype(before, opts, el) {
    if ( before && el.style.filter ) {
        opts._filter = el.style.filter;
        try { el.style.removeAttribute('filter'); }
        catch(smother) {} // handle old opera versions
    }
    else if ( !before && opts._filter ) {
        el.style.filter = opts._filter;
    }
}