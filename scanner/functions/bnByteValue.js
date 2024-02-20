function bnByteValue() {
    return (this.t == 0) ? this.s : (this[0] << 24) >> 24;
}