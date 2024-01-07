function getProgramLibrary(device) {
    const library = programLibraryDeviceCache.get(device);
    Debug.assert(library);
    return library;
}