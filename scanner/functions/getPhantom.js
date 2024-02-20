function getPhantom() {
    try {
        return require('phantomjs-prebuilt');
    } catch (e1) {
        try {
            // fall back to older package
            return require('phantomjs');
        } catch (e2) {
            // warn users to install phantomjs-prebuilt if they have neither installed
            throw e1;
        }
    }
}