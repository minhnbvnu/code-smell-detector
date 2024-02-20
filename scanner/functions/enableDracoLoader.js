function enableDracoLoader(path, config) {
    if (!path) {
        throw new Error('Path to draco folder is mandatory');
    }
    const dracoLoader = new DRACOLoader();
    dracoLoader.setDecoderPath(path);
    if (config) {
        dracoLoader.setDecoderConfig(config);
    }
    glTFLoader.setDRACOLoader(dracoLoader);
}