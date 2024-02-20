function remove_frame_hooks_by_mode(mode) {
    for (let i = 0; i < $frameHooks.length; ++i) {
        if ($frameHooks[i].$mode === mode) {
            $frameHooks[i] = $frameHooks[$frameHooks.length - 1];
            --i;
            --$frameHooks.length;
        }
    }
}