function shuffled(a, rng) {
    if (Array.isArray(a)) {
        const c = clone(a);
        shuffle(c, rng);
        return c;
    } else {
        // String case
        const c = split(a);
        shuffle(c, rng);
        return join(c);
    }
}