function remove_ss_from_cookie(sid) {
    var existing_ss = readCookie('screenshot_ids');
    existing_ss = existing_ss.replace(sid, '') .replace(',,', ',');
    while(existing_ss.charAt(0) === ',')
            existing_ss = existing_ss.substr(1);
    if (existing_ss.length) {
        createCookie('screenshot_ids',existing_ss, 60);
    } else {
        eraseCookie('screenshot_ids');
    }
}