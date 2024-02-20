function readE2() {
    if (!isNodeHigh(nodenames['ex_bcdehl'])) {
        if (isNodeHigh(nodenames['ex_dehl1'])) {
            return readBits('reg_ll', 8);
        } else {
            return readBits('reg_ee', 8);
        }
    } else {
        if (isNodeHigh(nodenames['ex_dehl0'])) {
            return readBits('reg_l', 8);
        } else {
            return readBits('reg_e', 8);
        }
    }
}