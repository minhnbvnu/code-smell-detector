function $processFrameHooks() {
    // Clone the hooks, so that it is safe to iterate over this
    // array even if other hooks are adding and removing more hooks
    const array = $frameHooks.slice();
    for (let i = 0; i < array.length; ++i) {
        const hook = array[i];
        if ((hook.$mode === undefined) || (hook.$mode === $gameMode)) {
            --hook.$frames;
            
            const r = hook.$callback ? hook.$callback(hook.$frames, hook.$maxFrames - 1, hook.$data) : 0;

            // Remove the hook *before* the callback executes so that if a
            // set_mode happens within the callback it does not
            // re-trigger
            if (r || (hook.$frames <= 0)) {
                fast_remove_value($frameHooks, hook);
            }
            
            if (! r && (hook.$frames <= 0)) {
                // End hook
                if (hook.$endCallback) { hook.$endCallback(hook.$data); }
            }
        }
    }        
}