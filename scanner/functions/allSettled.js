function allSettled(promises) {
    return Q(promises).allSettled();
}