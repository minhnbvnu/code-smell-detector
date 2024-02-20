function $toFrame(entity, v, out) {
    // Translate
    const x = v.x - entity.pos.x;
    const y = v.y - entity.pos.y;
    
    // Rotate
    let c = $Math.cos(entity.angle * rotation_sign());
    let s = $Math.sin(entity.angle * rotation_sign());
    
    if (out === undefined) { out = {x:0, y:0}; }
    
    out.x = x * c + y * s;
    out.y = y * c - x * s;
    
    return out;
}