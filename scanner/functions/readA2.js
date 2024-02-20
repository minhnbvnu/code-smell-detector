function readA2() {
    if (isNodeHigh(nodenames['ex_af'])) {
        return readBits('reg_aa', 8);
    } else {
        return readBits('reg_a', 8);
    }
}