function genRand(lb, hb) {
    if(lb < 0 || hb < 0 || hb < lb) return 0;

    var range = hb - lb + 1;
    return (rand() % range) + lb;
}