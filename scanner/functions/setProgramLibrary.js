function setProgramLibrary(device, library) {
    Debug.assert(library);
    programLibraryDeviceCache.get(device, () => {
        return library;
    });
}