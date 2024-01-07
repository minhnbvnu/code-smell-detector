function getGlslangPath() {
    const i = href.indexOf("/examples/");
    if (i === -1) { // npm run serve
        return '/static/lib/glslang/';
    }
    return href.substring(0, i) + "/examples/src/lib/glslang/";
}