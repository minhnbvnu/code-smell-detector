function sc_dualAppend(l1, l2) {
    if (l1 === null) return l2;
    if (l2 === null) return l1;
    var rev = sc_reverse(l1);
    return sc_reverseAppendBang(rev, l2);
}