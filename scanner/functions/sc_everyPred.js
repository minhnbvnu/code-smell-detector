function sc_everyPred(proc, l) {
    var tmp = sc_every(proc, l);
    if (tmp !== false) return true;
    return false;
}