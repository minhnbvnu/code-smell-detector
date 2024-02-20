function enableKtx2Loader(path, renderer) {
    if (!path || !renderer) {
        throw new Error('Path to ktx2 folder and renderer are mandatory');
    }
    const ktx2Loader = new KTX2Loader();
    ktx2Loader.setTranscoderPath(path);
    ktx2Loader.detectSupport(renderer);
    glTFLoader.setKTX2Loader(ktx2Loader);
}