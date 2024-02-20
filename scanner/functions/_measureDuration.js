function _measureDuration(method, arg, expected_nanos_hint) {
    let ms = 1.0e6;
    let repeats = expected_nanos_hint < 5 * ms ? 100 :
        expected_nanos_hint < 30 * ms ? 50 :
        10;
    // Dry run to get any one-time initialization done.
    method(arg);

    let t0 = window.performance.now();
    for (let i = 0; i < repeats; i++) {
        method(arg);
    }
    let t1 = window.performance.now();
    return {duration_nanos: (t1 - t0) / repeats * ms};
}