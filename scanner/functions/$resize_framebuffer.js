function $resize_framebuffer(w, h) {
    // console.log('resize_framebuffer()');
    $SCREEN_WIDTH = w;
    $SCREEN_HEIGHT = h;

    // In web worker mode, send a message
    if ($GPU) {
        $GPU.postMessage({type: 'resize_framebuffer', SCREEN_WIDTH: w, SCREEN_HEIGHT: h})
    } else {
        // Call directly
        $gpu_resize_framebuffer(w, h);
    }
}