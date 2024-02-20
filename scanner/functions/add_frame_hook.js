function add_frame_hook(callback, endCallback, frames, mode, data) {
    if (mode === undefined) { mode = get_mode(); }
    if (mode === "all") { mode = undefined; }
    if (is_nan(frames)) { $error("nan frames on add_frame_hook()"); }
    const hook = {$callback:callback, $endCallback:endCallback, $mode:mode, $frames:frames, $maxFrames:frames, $data:data};
    $frameHooks.push(hook);
    return hook;
}