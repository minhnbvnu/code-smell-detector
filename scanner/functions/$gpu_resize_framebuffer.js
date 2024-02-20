function $gpu_resize_framebuffer(w, h) {
    $SCREEN_WIDTH = w;
    $SCREEN_HEIGHT = h;
    $screen = new Uint16Array(w * h);
    $screen32 = new Uint32Array($screen.buffer);
}