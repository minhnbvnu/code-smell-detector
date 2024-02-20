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
    }