function _us(t) {
        // From double-precision unix (millisecond) timestamp, get microseconds since
        // last second. Precision seems to run out around the hundreds of nanoseconds
        // scale, so rounding to the nearest microsecond should round to a nice
        // microsecond / millisecond tick.
        return Math.round(((t / 1000) % 1) * 1000000);
    }