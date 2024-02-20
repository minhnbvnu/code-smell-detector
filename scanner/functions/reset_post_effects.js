function reset_post_effects() {
    $postFX = {
        background: {r:0, g:0, b:0, a:0},
        color: {r:0, g:0, b:0, a:0},
        color_blend: "source-over",
        bloom: 0,
        scale: {x: 1, y: 1},
        angle: 0,
        pos: {x:0, y:0},
        motion_blur: 0,
        afterglow: {r: 0, g: 0, b: 0}
    };

    // Not bound during the initial load because it is called
    // immediately to set the initial value.
    if (gamepad_array && (gamepad_array[0].status === 'host')) {
        $notifyGuestsOfPostEffects();
    }
}