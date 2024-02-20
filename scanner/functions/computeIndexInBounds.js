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