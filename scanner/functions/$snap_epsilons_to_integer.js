function $snap_epsilons_to_integer(x) {
    const int_x = $Math.round(x)
    if ((x !== int_x) && ($Math.abs(x - int_x) < 1e-12)) {
        return int_x;
    } else {
        return x;
    }
}