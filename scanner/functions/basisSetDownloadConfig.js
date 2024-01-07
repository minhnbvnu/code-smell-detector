function basisSetDownloadConfig(glueUrl, wasmUrl, fallbackUrl) {
    Debug.deprecated('pc.basisSetDownloadConfig is deprecated. Use pc.basisInitialize instead.');
    basisInitialize({
        glueUrl: glueUrl,
        wasmUrl: wasmUrl,
        fallbackUrl: fallbackUrl,
        lazyInit: true
    });
}