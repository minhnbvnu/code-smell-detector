function readC2() {
    if (!isNodeHigh(nodenames['ex_bcdehl'])) {
        return readBits('reg_cc', 8);
    } else {
        return readBits('reg_c', 8);
    }
}