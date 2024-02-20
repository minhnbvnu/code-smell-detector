function bnShortValue() {
    return (this.t == 0) ? this.s : (this[0] << 16) >> 16;
}