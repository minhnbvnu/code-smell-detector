function angle_to_xy(angle) {
    return {
        x: $snap_epsilons_to_integer($Math.cos(angle)),
        y: $snap_epsilons_to_integer(rotation_sign() * $Math.sin(angle))
    };
}