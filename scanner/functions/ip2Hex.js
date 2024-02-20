function ip2Hex(ip) {
    // We can only deal with IPv4 addresses for now
    if (!ip.match(/^[0-9]{0,3}\.[0-9]{0,3}\.[0-9]{0,3}\.[0-9]{0,3}$/)) {
        return;
    }

    var hexed = ip.split('.').map(function ipSplitMapCb(i){
        var hex = parseInt(i, 10).toString(16);

        // Pad out the hex value if it's a single char
        if (hex.length === 1) {
            hex = '0' + hex;
        }

        return hex;
    }).join('');

    return hexed;
}