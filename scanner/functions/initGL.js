function initGL(canvas) {
    try {
        var gl = canvas.getContext('experimental-webgl');
        gl.viewportWidth = canvas.width;
        gl.viewportHeight = canvas.height;
    }
    catch (e) {
    }
    if (!gl) {
        alert('Could not initialise WebGL, sorry :-(');
    }
    return gl;
}