function set_random_seed(seed) {
        if (seed === undefined) {
            seed = local_time().millisecond;
        } else if (seed === 0) {
            seed = 4.7499362e+13;
        }
        if (seed < 2**16) { seed += seed * 1.3529423483002e15; }
        state0U = $Math.abs(seed / 2**24) >>> 0;

        // Avoid all zeros
        if (state0U === 0) { state0U = 5662365; }
        
        state0L = $Math.abs(seed) >>> 0;
        state1U = $Math.abs(seed / 2**16) >>> 0;
        state1L = $Math.abs(seed / 2**32) >>> 0;
        //$console.log(seed, state0U, state0L, state1U, state1L)
    }