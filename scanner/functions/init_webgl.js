async function init_webgl() {
        // We use a global invisible canvas and gl context. By having a global context,
        // we avoid the limitation of max 16 contexts that most browsers have.
        const canvas = document.createElement("canvas");
        const gl = canvas.getContext("webgl", { alpha: true, antialias: false, depth: false, premultipliedAlpha: true });
        // If WebGL is available, we store a reference to the ReGL wrapper on
        // the ctx object, because that's what gets passed everywhere.
        if (gl != null) {
            const webgl = await (0, modules_1.load_module)(Promise.resolve().then(() => tslib_1.__importStar(require(511) /* ../glyphs/webgl */)));
            if (webgl != null) {
                const regl_wrapper = webgl.get_regl(gl);
                if (regl_wrapper.has_webgl) {
                    return { canvas, regl_wrapper };
                }
                else {
                    logging_1.logger.trace("WebGL is supported, but not the required extensions");
                }
            }
            else {
                logging_1.logger.trace("WebGL is supported, but bokehjs(.min).js bundle is not available");
            }
        }
        else {
            logging_1.logger.trace("WebGL is not supported");
        }
        return null;
    }