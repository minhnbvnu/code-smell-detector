function animation_frame(animation, f) {
    f = $Math.floor(f);
    const N = animation.length;

    if (animation.extrapolate === 'clamp') {
        // Handle out of bounds cases by clamping
        if (f < 0) { return animation[0]; }
        if (f >= animation.frames) { return animation[N - 1]; }
    } else {
        // Handle out of bounds cases by looping. To handle negatives, we need
        // to add and then mod again. Mod preserves fractions.
        f = ((f % animation.period) + animation.period) % animation.period;
    }

    if (animation.extrapolate === 'oscillate') {
        // Oscillation will give us twice the actual number of frames from the
        // looping, so we need to figure out which part of the period we're in.
        const reverseTime = (animation.period + animation[0].frames + animation[N - 1].frames) / 2;
        if (f >= reverseTime) {
            // Count backwards from the end
            f -= reverseTime;
            let i = N - 2;
            while ((i > 0) && (f >= animation[i].frames)) {
                f -= animation[i].frames;
                --i;
            }
               
            return animation[i];
        }
    }
    
    // Find the value by searching linearly within the array (since we do not
    // store cumulative values to binary search by).
    let i = 0;
    while ((i < N) && (f >= animation[i].frames)) {
        f -= animation[i].frames;
        ++i;
    }
    
    return animation[$Math.min(i, N - 1)];
}