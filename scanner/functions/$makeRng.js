function $makeRng(seed) {
    /* Based on https://github.com/AndreasMadsen/xorshift/blob/master/xorshift.js

       Copyright (c) 2014 Andreas Madsen & Emil Bay

       Permission is hereby granted, free of charge, to any person obtaining a copy of this
       software and associated documentation files (the "Software"), to deal in the Software
       without restriction, including without limitation the rights to use, copy, modify,
       merge, publish, distribute, sublicense, and/or sell copies of the Software, and to
       permit persons to whom the Software is furnished to do so, subject to the following
       conditions:

       The above copyright notice and this permission notice shall be included in all copies or
       substantial portions of the Software.

       THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED,
       INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR
       PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
       LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT
       OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
       OTHER DEALINGS IN THE SOFTWARE.
    */
    
    var state0U = 5662365, state0L = 20000, state1U = 30000, state1L = 4095;

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

    set_random_seed(seed);

    function random(lo, hi) {
        // uint64_t s1 = s[0]
        var s1U = state0U, s1L = state0L;
        // uint64_t s0 = s[1]
        var s0U = state1U, s0L = state1L;

        // result = s0 + s1
        var sumL = (s0L >>> 0) + (s1L >>> 0);
        var resU = (s0U + s1U + (sumL / 2 >>> 31)) >>> 0;
        var resL = sumL >>> 0;
        
        // s[0] = s0
        state0U = s0U;
        state0L = s0L;
        
        // - t1 = [0, 0]
        var t1U = 0, t1L = 0;
        // - t2 = [0, 0]
        var t2U = 0, t2L = 0;
        
        // s1 ^= s1 << 23;
        // :: t1 = s1 << 23
        var a1 = 23;
        var m1 = 0xFFFFFFFF << (32 - a1);
        t1U = (s1U << a1) | ((s1L & m1) >>> (32 - a1));
        t1L = s1L << a1;
        // :: s1 = s1 ^ t1
        s1U = s1U ^ t1U;
        s1L = s1L ^ t1L;
        
        // t1 = ( s1 ^ s0 ^ ( s1 >> 17 ) ^ ( s0 >> 26 ) )
        // :: t1 = s1 ^ s0
        t1U = s1U ^ s0U;
        t1L = s1L ^ s0L;
        // :: t2 = s1 >> 18
        var a2 = 18;
        var m2 = 0xFFFFFFFF >>> (32 - a2);
        t2U = s1U >>> a2;
        t2L = (s1L >>> a2) | ((s1U & m2) << (32 - a2));
        // :: t1 = t1 ^ t2
        t1U = t1U ^ t2U;
        t1L = t1L ^ t2L;
        // :: t2 = s0 >> 5
        var a3 = 5;
        var m3 = 0xFFFFFFFF >>> (32 - a3);
        t2U = s0U >>> a3;
        t2L = (s0L >>> a3) | ((s0U & m3) << (32 - a3));
        // :: t1 = t1 ^ t2
        t1U = t1U ^ t2U;
        t1L = t1L ^ t2L;
        
        // s[1] = t1
        state1U = t1U;
        state1L = t1L;
        
        var r = resU * 2.3283064365386963e-10 + (resL >>> 12) * 2.220446049250313e-16;
        if (hi === undefined) {
            if (lo === undefined) {
                return r;
            } else {
                $error("Use random() or random(lo, hi). A single argument is not supported.");
            }
        } else {
            return r * (hi - lo) + lo;
        }
    }

    return [random, set_random_seed];
}