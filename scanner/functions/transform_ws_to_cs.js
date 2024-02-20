function transform_ws_to_cs(ws_point, ws_z) {
    const cs_z = (ws_z || 0) - $camera.z;
    const mag = $zoom(cs_z);
    const C = $Math.cos($camera.angle) * mag, S = $Math.sin($camera.angle * rotation_sign()) * mag;
    const x = ws_point.x - $camera.x, y = ws_point.y - $camera.y;
    return {x: x * C + y * S, y: y * C - x * S};
}