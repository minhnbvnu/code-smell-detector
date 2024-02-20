function pageKey() {
    var key = window.location.hash.substring(1);  // Get key

    // Some stupid web 2.0 services and redirectors add data AFTER the anchor
    // (such as &utm_source=...).
    // We will strip any additional data.

    // First, strip everything after the equal sign (=) which signals end of base64 string.
    i = key.indexOf('='); if (i>-1) { key = key.substring(0,i+1); }

    // If the equal sign was not present, some parameters may remain:
    i = key.indexOf('&'); if (i>-1) { key = key.substring(0,i); }

    // Then add trailing equal sign if it's missing
    if (key.charAt(key.length-1)!=='=') key+='=';

    return key;
}