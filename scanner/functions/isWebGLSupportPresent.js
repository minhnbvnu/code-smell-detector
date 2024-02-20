function isWebGLSupportPresent() {
    if (__webGLSupportPresent === undefined) {
        __webGLSupportPresent = false;
        if (window.WebGLRenderingContext !== undefined) {
            let canvas = document.createElement('canvas');
            let ctx = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
            if (ctx instanceof WebGLRenderingContext) {
                __webGLSupportPresent = true;

                let shader = ctx.createShader(WebGLRenderingContext.VERTEX_SHADER);
                ctx.shaderSource(shader, `
                    precision highp float;
                    precision highp int;
                    attribute vec2 position;
                    void main() {gl_Position = vec4(position, 0, 1);}`);
                ctx.compileShader(shader);

                // HACK: tests on travis-ci give this warning when compiling shaders, and then give
                // bad test results. Checking for it is a workaround to make the build pass.
                let term = "extension `GL_ARB_gpu_shader5' unsupported";
                __onlyPartialWebGLSupportPresent = ctx.getShaderInfoLog(shader).indexOf(term) !== -1;
                if (__onlyPartialWebGLSupportPresent) {
                    Config.IGNORED_WEBGL_INFO_TERMS.push(term);
                    console.log('Only partial WebGL support is present. Some tests may fail and be ignored.')
                }
            }
        }
    }
    return __webGLSupportPresent;
}