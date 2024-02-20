function makeURLAbsolute(parentURL, childURL) {
    if (childURL.startsWith('quad://')) {
        // quad URL. Make relative to the quadplay installation
        return childURL.replace(/^quad:\/\//, urlDir(location.href) + '../').replace(/\/console\/\.\.\//, '/');
    } else if (/^.{3,6}:\/\//.test(childURL)) {
        // Already absolute, some other protocol
        return childURL;
    } else if (/^[\\/]/.test(childURL)) {
        // Absolute on the server, Unix path. Copy the host and protocol
        const match = parentURL.match(/^.{3,6}:\/\/.*?(?=\/)/);
        if (match) {
            return match[0] + childURL;
        } else {
            // Hope...
            return childURL;
        }
    } else if (/^[A-Za-z]:[\\\/]/.test(childURL)) {
        // Absolute on the server, Windows path. Copy the host and protocol
        const match = parentURL.match(/^.{3,6}:\/\/.*?(?=\/)/);
        if (match) {
            return match[0] + '/' + childURL;
        } else {
            // Hope...
            return childURL;
        }
    } else {

        // Strip the last part of the parent
        const url = urlDir(parentURL) + childURL;
        
        // Hide the common case of console/.. in URLs
        return url.replace(/\/console\/\.\.\//, '/');
    }
}