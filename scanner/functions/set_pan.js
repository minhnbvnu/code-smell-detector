function set_pan(audio, pan) {
    if (pan && pan.x !== undefined && pan.y !== undefined) {
        // Positional sound
        pan = transform_cs_to_ss(transform_ws_to_cs(pan));
        pan = $clamp((2 * pan.x / SCREEN_SIZE.x) - 1, -1, 1);
    }
    
    $set_pan(audio, pan);
}