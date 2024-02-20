function readB2() {
    if (!isNodeHigh(nodenames['ex_bcdehl'])) {
        return readBits('reg_bb', 8);
    } else {
        return readBits('reg_b', 8);
    }
}