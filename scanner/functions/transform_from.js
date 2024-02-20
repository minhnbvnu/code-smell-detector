function transform_from(pos, angle, scale, coord) {
    const a = angle * -rotation_sign();
    const C = $Math.cos(a);
    const S = $Math.sin(a);

    const Xx =  C, Xy = S;
    const Yx = -S, Yy = C;

    const x = coord.x * scale.x, y = coord.y * scale.y;
    return {x: x * Xx + y * Xy + pos.x, y: x * Yx + y * Yy + pos.y};
}