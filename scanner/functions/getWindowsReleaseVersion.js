function getWindowsReleaseVersion() {
    const os = require('os');
    const release = os.release();
    if (release.startsWith('10.0.2')) {
        return 11;
    } else if (release.startsWith('10.0.1')) {
        return 10;
    } else if (release.startsWith('6.2') || release.startsWith('6.3')) {
        return 8;
    } else if (release.startsWith('6.1')) {
        return 7;
    } else return 0;
}