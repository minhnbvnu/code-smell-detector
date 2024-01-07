function createGLContext(canvas, options) {
    const attributes = {
        'alpha': true,
        'stencil' : true,
        'preserveDrawingBuffer' : true,
        'antialias' : false
    };
    const names = ['webgl', 'experimental-webgl'];
    let context = null;
    /* eslint-disable no-empty */
    for (let i = 0; i < names.length; ++i) {
        try {
            context = canvas.getContext(names[i], options || attributes);
        } catch (e) {}
        if (context) {
            break;
        }
    }
    return context;
    /* eslint-enable no-empty */
}