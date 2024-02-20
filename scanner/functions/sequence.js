function sequence(...seq) {
    // Is there any work?
    if (seq.length === 0) { return; }

    if (Array.isArray(seq[0])) {
        $error("sequence() does not accept an array argument. Use sequence(...array) instead.");
    }
    
    let totalLifetime = 0;
    const queue = [];
    
    for (let i = 0; i < seq.length; ++i) {
        const entry = seq[i];
        if (typeof entry === 'function' || entry === undefined) {
            ++totalLifetime;
            queue.push({callback: entry, frames: 1, begin_callback: undefined, end_callback: undefined, data: undefined})
        } else {
            if (typeof entry !== 'number' && typeof entry !== 'object') {
                $error("Illegal sequence entry. Must be a function, nil, number, or object");
            }
            
            let frames = (typeof entry === 'number') ? entry : entry.frames;
            frames = (frames <= 0.5) ? 0 : $Math.max(1, $Math.round(frames || 1));
            if (frames > 0) {
                
                queue.push({
                    callback: entry.callback,
                    begin_callback: entry.begin_callback,
                    end_callback: entry.end_callback,
                    frames: frames,
                    data: entry.data});
                
                totalLifetime += frames;
            }
        }
    }
    
    let currentFrame = 0;
    function update(framesleft, lifetime) {
        if (queue.length === 0) {
            remove_frame_hook(hook);
            return;
        }
        
        const step = queue[0];
        
        if (step.callback) {
            if (currentFrame === 0 && step.begin_callback) {
                const result = step.begin_callback(step.data);
                if (result === sequence.BREAK) {
                    remove_frame_hook(hook);
                    return;
                }
            }
            
            const result = step.callback(step.frames - currentFrame - 1, step.frames, step.data);
            if (result === sequence.BREAK) {
                remove_frame_hook(hook);
                return;
            } else if (result === sequence.NEXT) {
                // Immediately advance
                if (step.end_callback && (step.end_callback(step.data) === sequence.BREAK)) {
                    remove_frame_hook(hook);
                    return;
                }
                pop_front(queue);
                currentFrame = 0;
                return;
            }
        }
        ++currentFrame;

        if (currentFrame >= step.frames) {
            if (step.end_callback && (step.end_callback(step.data) === sequence.BREAK)) {
                remove_frame_hook(hook);
                return;
            }
            pop_front(queue);
            currentFrame = 0;
        }
    }

    // The hook is referenced above and needs to be in this scope
    const hook = add_frame_hook(update, undefined, totalLifetime);

    return hook;
}