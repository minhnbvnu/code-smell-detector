function micros(microseconds) {
    return {
        duration_nanos: microseconds * 1.0e3,
        description: microseconds + " us"
    };
}