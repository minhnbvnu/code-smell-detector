function generateNetID() {
    // Math.random() varies across platforms in its implementation,
    // and is initialized differently per instance (how reliably it is
    // initialized is unknown).
    //
    // performance.now returns a time from an arbitrary baseline in
    // milliseconds, with a fractional part. The accuracy of the
    // fractional part varies across platforms, but the time within a
    // second should generally be uniformly distributed.
    const MAX = 0x40000000;

    // Because the inputs have finite precision, multiplication and
    // modulo do not make the outputs uniformly distributed; there's a
    // little clumping but it should be fine for our purpose here.
    const A = Math.random();
    const B = (performance.now() % 1000) / 1000;
    return NET_ID_PREFIX + ('' + Math.min(MAX - 1, Math.floor(MAX * ((A + B) % 1)))).padStart(10, '0');
}