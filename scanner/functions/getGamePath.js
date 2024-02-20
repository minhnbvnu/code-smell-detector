function getGamePath() {
    let gamePath = gameSource.jsonURL.replace(/\\/g, '/').replace(/\/[^/]+\.game\.json$/g, '/');
    if (gamePath.startsWith(location.origin)) {
        gamePath = gamePath.substring(location.origin.length);
    } 
   
    // On Windows this must still return a leading slash in front of absolute paths
    // because that is the "webpath" format that the server expects.
    console.assert(gamePath[1] !== ':', 'Absolute windows webpath without a leading slash')
   
    return gamePath;
}