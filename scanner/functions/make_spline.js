function make_spline(timeSrc, controlSrc, order, extrapolate) {
    // Argument checking
    if (controlSrc.length < 2) { $error('Must specify at least two control points'); }
    if (order === undefined) { order = 3; }
    if (extrapolate === undefined) { extrapolate = 'stall'; }
    if (find(['stall', 'loop', 'clamp', 'continue', 'oscillate'], extrapolate) === undefined) {
        $error('extrapolate argument to make_spline must be "stall", "loop", "clamp", or "continue"');
    }

    if (controlSrc.length < 4 && order === 3) {
        $error('order 3 splines require at least 4 control points.');
    }
    
    order = $Math.round(order);
    if (order === 2 || order < 0 || order > 3) { $error('order must be 0, 1, or 3'); }

    // Clone the arrays adn elements in them
    const time = [], control = [];
    
    for (let i = 0; i < timeSrc.length; ++i) {
        time[i] = timeSrc[i];
        if ((i > 0) && (time[i] <= time[i - 1])) {
            $error('times must increase through the array');
        }
        control[i] = clone(controlSrc[i]);
    }

    if (extrapolate === 'loop') {
        if (time.length !== controlSrc.length + 1) {
            $error('There must be one more time than value to use "loop" extrapolation');
        }
        // Duplicate the last control point, which was previously null
        control[control.length - 1] = clone(control[0]);
    } else if (timeSrc.length !== controlSrc.length) {
        $error('time and value arrays must have the same size');
    }   

    if (extrapolate === 'oscillate') {
        const N = control.length;

        // Convert to "loop"
        for (let i = 0; i < N - 1; ++i) {
            control[N + i] = control[N - i - 2];
            time[N + i] = time[N + i - 1] + (time[N - i - 1] - time[N - i - 2]);
        }
        extrapolate = 'loop';
    }

    // Number of control points, not included a potentially duplicated
    // one at the end to make wrapping math easier.
    const N = control.length - (extrapolate === 'loop' ? 1 : 0);

    // Time covered by all of the intervals between control points,
    // including the wrap one in loop mode. 
    const duration = time[time.length - 1] - time[0];

    /** Returns the requested control point and time sample based on
        array index in outTimeArray and outControlArray.  

        If the array index is out of bounds, wraps (for a cyclic
        spline) or linearly extrapolates (for a non-cyclic spline),
        assuming time intervals follow the first or last sample
        recorded.
    */
    function getControl(i, outTimeArray, outControlArray, outIndex) {
        let t, c;

        if (extrapolate === 'loop') {
            c = control[$Math.floor(loop(i, N))];
            if (i < 0) {
                // Wrapped around bottom

                // Number of times we wrapped around the cyclic array
                const wraps = $Math.floor((N + 1 - i) / N);
                const j = (i + wraps * N) % N;
                t = time[j] - wraps * duration;

            } else if (i < N) {
                // Normal case: no wrap
                t = time[i];

            } else {
                // Wrapped around top

                // Number of times we wrapped around the cyclic array
                const wraps = $Math.floor(i / N);
                const j = i % N;
                t = time[j] + wraps * duration;
            }

        } else if (i < 0) { // Not cyclic, off the low side

            // Step away from control point 0
            const dt = time[1] - time[0];
            
            if (extrapolate === 'continue') { // linear
                // Extrapolate (note; i is negative and an integer)
                c = lerp(control[0], control[1], i);
            } else {
                // Stall or clamp
                // Return the first, clamping the control point
                c = control[0];
            }
            t = dt * i + time[0];

        } else if (i >= N) { // Not cyclic, off the high side
            const dt = time[N - 1] - time[N - 2];
            
            if (extrapolate === 'continue') {
                // Extrapolate
                c = lerp(control[N - 2], control[N - 1], i - (N - 2));
            } else {
                // Stall or clamp
                // Return the last, clamping the control point
                c = control[N - 1];
            }
            // Extrapolate
            t = time[N - 1] + dt * (i - N + 1);

        } else {
            // Normal case: in bounds, no extrapolation needed
            c = control[i];
            t = time[i];
        }
        
        outControlArray[outIndex] = c;
        outTimeArray[outIndex] = t;
    }


    /** Derived from the G3D Innovation Engine (https://casual-effects.com/g3d).
        Assumes that time[0] <= s < time[N - 1].  called by compute_index. Returns {i, u} */
    function computeIndexInBounds(s) {
        $console.assert((s < time[N - 1]) && (time[0] <= s));
        const t0 = time[0];
        const tn = time[N - 1];

        if (s > time[N - 1]) {
            $console.assert(extrapolate === 'loop');
            return {i:N - 1, u:(s - time[N - 1]) / (time[N] - time[N - 1])};
        }

        // Guess a linear start index
        let i = $Math.floor((N - 1) * (s - t0) / (tn - t0));
    
        // Inclusive bounds for binary search
        let hi = N - 1;
        let lo = 0;
    
        while ((time[i] > s) || ((i < time.length - 1) && (time[i + 1] <= s))) {
            if (hi <= lo) {
                $console.log(lo, hi, i, s);
                $error('Infinite loop?');
            }

            if (time[i] > s) {
                // value at current index is too big. Look on
                // the lower half.
                hi = i - 1;
            } else if (time[i + 1] <= s) {
                // value at current index is too small. Look
                // on the upper half
                lo = i + 1;
            }
            
            i = (hi + lo) >> 1;
        }
    
        // Having exited the above loop, i must be correct, so compute u.
        if (i === N - 1) {
            return {i:i, u:0};
        } else {
            return {i: i, u: (s - time[i]) / (time[i + 1] - time[i])};
        }
    }


    /**
       Given a time @a s, finds @a i and 0 <= @a u < 1 such that
       @a s = time[@a i] * @a u + time[@a i + 1] * (1 - @a u).  Note that
       @a i may be outside the bounds of the time and control arrays;
       use getControl to handle wraparound and extrapolation issues.
       
       This function takes expected O(1) time for control points with
       uniform time sampled control points or for uniformly
       distributed random time samples, but may take O( log time.size() ) time
       in the worst case.

       Called from evaluate(). returns {i, u}
    */
    function compute_index(s) {
        let i, u;
        const t0 = time[0];
        const tn = time[N - 1];
    
        if (extrapolate === 'loop') {
            // Cyclic spline
            if ((s < t0) || (s >= time[N])) {
                // Cyclic, off the bottom or top.
                // Compute offset and reduce to the in-bounds case.

                // Number of times we wrapped around the cyclic array
                const wraps = floor((s - t0) / duration);
                const result = computeIndexInBounds(s - duration * wraps);
                result.i += wraps * N;
                return result;
                
            } else if (s >= tn) {
                // Cyclic, off the top but before the end of the last interval
                i = N - 1;
                u = (s - tn) / (time[N] - tn);
                return {i:i, u:u};
            
            } else {
                // Cyclic, in bounds
                return computeIndexInBounds(s);
            }
            
        } else {
            // Non-cyclic
            if (s < t0) {
                // Non-cyclic, off the bottom.  Assume points are spaced
                // following the first time interval.
                const dt = time[1] - t0;
                const x = (s - t0) / dt;
                i = $Math.floor(x);
                u = x - i;
                return {i:i, u:u};
                
            } else if (s >= tn) {
                // Non-cyclic, off the top.  Assume points are spaced following
                // the last time interval.
                const dt = tn - time[N - 2];
                const x = (N - 1) + (s - tn) / dt;
                i = $Math.floor(x);
                u = x - i;
                return {i:i, u:u};
                
            } else {
                // In bounds, non-cyclic.  Assume a regular
                // distribution (which gives O(1) for uniform spacing)
                // and then binary search to handle the general case
                // efficiently.

                return computeIndexInBounds(s);
                
            } // if in bounds
        } // extrapolation Mode
    } // compute_index
    

    /* Derived from the G3D Innovation Engine (https://casual-effects.com/g3d).
       Return the position at time s.  The spline is defined outside
       of the time samples by extrapolation or cycling. */
    function evaluate(s) {
        if (extrapolate === 'clamp') {
            if (s < time[0]) { return clone(control[0]); }
            else if (s > time[N - 1]) { return clone(control[N - 1]); }
        }
        
        const indexResult = compute_index(s);
        // Index of the first control point
        const i = indexResult.i;
        // Fractional part of the time
        const u = indexResult.u;

        // Array of 4 control points and control times.  p[1] is the
        // one below this time and p[2] is above it.  The others are
        // needed to provide derivatives at the ends.
        let p = [], t = [];
        for (let j = 0; j < 4; ++j) {
            getControl(i + j - 1, t, p, j);
        }

        if (order === 0) {
            return clone(p[1]);
        } else if (order === 1) {
            const a = (s - t[1]) / (t[2] - t[1]);
            return lerp(p[1], p[2], a);
        }

        // Time deltas
        const dt0 = t[1] - t[0];
        const dt1 = t[2] - t[1];
        const dt2 = t[3] - t[2];

        const dp0 = $sub(p[1], p[0]);
        const dp1 = $sub(p[2], p[1]);
        const dp2 = $sub(p[3], p[2]);

        // The factor of 1/2 from averaging two time intervals is 
        // already factored into the basis
        
        // tan1 = (dp0 / dt0 + dp1 / dt1) * ((dt0 + dt1) * 0.5);
        // The last term normalizes for unequal time intervals
        const x = (dt0 + dt1) * 0.5;
        
        const n0 = x / dt0;
        const n1 = x / dt1;
        const n2 = x / dt2;

        const dp1n1 = $mul(dp1, n1);
        
        const tan1 = $add($mul(dp0, n0), dp1n1);
        const tan2 = $add(dp1n1, $mul(dp2, n2));

        // Powers of the fractional part, u
        const uvec = [u * u * u, u * u, u, 1];

        // Compute the weights on each of the control points/tangents
        const basis = [ 0.5,  2.0, -2.0,  0.5,
                       -1.0, -3.0,  3.0, -0.5,
                        0.5,  0.0,  0.0,  0.0,
                       -0.0,  1.0,  0.0,  0.0];

        // Matrix product
        const weights = [0, 0, 0, 0];
        for (let i = 0; i < 4; ++i) {
            for (let j = 0; j < 4; ++j) {
                weights[i] += uvec[j] * basis[i + 4 * j];
            }
        }

        return $add($add(
                    $add($mul(tan1, weights[0]),
                         $mul(p[1], weights[1])),
                         $mul(p[2], weights[2])),
                         $mul(tan2, weights[3]));
    }

    return evaluate;
}