function set_screen_size(size, private_views) {
    if (private_views === undefined) {
        private_views = false;
    }

    if (! size || size.x === undefined) {
        $error('The first argument to set_screen_size() must be an xy()');
    }

    let w = $Math.round(size.x) | 0;
    let h = $Math.round(size.y) | 0;

    // Check for legal resolutions
    if (private_views) {
        if (! ((w === 768 && h === 448 && $feature_768x448) || (w === 640 && h === 360) || (w === 384 && h === 224) || (w === 128 && h === 128))) {
            $error('set_screen_size() with private views must be at 640x360, 384x224, or 128x128 resolution');
        }
    } else if (! ((w === 640 && h === 360) ||
                  (w === 384 && h === 224) ||
                  (w === 320 && h === 180) ||
                  (w === 192 && h === 112) ||
                  (w === 128 && h === 128) ||
                  (w ===  64 && h ===  64) ||
                  $feature_custom_resolution)) {
        $error('Illegal resolution for set_screen_size(): xy(' + w + ', ' + h + ')');
    }

    // Clear the current and previous draw call stack, which
    // may not be clipped properly to the screen
    $previousGraphicsCommandList.length = 0;
    $graphicsCommandList.length = 0;

    // Change the frame buffer size and rebind the
    // resolution constants
    $setFramebufferSize(w, h, private_views);

    // Reset the transformations
    reset_camera();
    reset_transform();
    reset_clip();
}