function millis(milliseconds) {
    return {
        duration_nanos: milliseconds * 1.0e6,
        description: milliseconds + " ms"
    };
}