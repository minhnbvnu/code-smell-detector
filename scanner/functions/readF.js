function readF() {
    if (!isNodeHigh(nodenames['ex_af'])) {
        return readBits('reg_ff', 8);
    } else {
        return readBits('reg_f', 8);
    }
}