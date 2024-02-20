function setPagingSize(size) {
    if (!size)
    return;

    // If the globPgSz doesn't match the locPgSz then we'll reset jtable, with this
    // trick this only happens once after a user has changed their profile preference
    var globPgSz = getCookie('globPgSz');
    var locPgSz = getCookie('locPgSz');

    if (size != globPgSz.val) {
    globPgSz.val = size;
    document.cookie = globPgSz.name + '=' + globPgSz.val + ';path=/;';
    }

    if (locPgSz.val != globPgSz.val) {
    document.cookie = locPgSz.name + "=" + globPgSz.val;
    ca = searchCookie('page-size');
    $.each(ca, function(i,c) {
        document.cookie = c.name + '=' + size + ';';
        });
    }
}