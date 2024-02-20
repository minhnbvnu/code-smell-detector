function transform_to(pos, angle, scale, coord) {
    const a = angle * -rotation_sign();
    const C = $Math.cos(a);
    const S = $Math.sin(a);
    
    const Xx =  C, Xy = S;
    const Yx = -S, Yy = C;

    const x = coord.x - pos.x, y = coord.y - pos.y;
    return xy((x * Xx + y * Yx) / scale.x,
              (x * Xy + y * Yy) / scale.y);
}