function make_random(seed) {
    var [random, set_random_seed] = $makeRng(seed || (local_time().millisecond() * 1e6));
    return random;
}