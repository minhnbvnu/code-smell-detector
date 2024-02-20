function readD2() {
    if (!isNodeHigh(nodenames['ex_bcdehl'])) {
        if (isNodeHigh(nodenames['ex_dehl1'])) {
            return readBits('reg_hh', 8);
        } else {
            return readBits('reg_dd', 8);
        }
    } else {
        if (isNodeHigh(nodenames['ex_dehl0'])) {
            return readBits('reg_h', 8);
        } else {
            return readBits('reg_d', 8);
        }
    }
}