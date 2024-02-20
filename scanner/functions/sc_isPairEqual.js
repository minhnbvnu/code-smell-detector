function sc_isPairEqual(p1, p2, comp) {
    return (comp(p1.car, p2.car) && comp(p1.cdr, p2.cdr));
}