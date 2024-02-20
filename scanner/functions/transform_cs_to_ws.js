function transform_cs_to_ws(cs_point, cs_z) {
    const mag = 1 / $zoom(cs_z);
    const C = $Math.cos(-$camera.angle) * mag, S = $Math.sin(-$camera.angle * rotation_sign()) * mag;
    
    const x = cs_point.x - $camera.x, y = cs_point.y - $camera.y;
    return {x: cs_point.x * C + cs_point.y * S + $camera.x,
            y: cs_point.y * C - cs_point.x * S + $camera.y};
}