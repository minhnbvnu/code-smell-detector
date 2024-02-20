function draw_bounds(entity, color, recurse) {
    if ($skipGraphics) { return; }
    
    if (! entity.pos) {
        $error('draw_bounds() must be called on an object with at least a pos property');
    }
    
    if (recurse === undefined) { recurse = true; }
    color = color || {r:0.6, g:0.6, b:0.6};
    const angle = (entity.angle || 0) * rotation_sign();
    const scale = entity.scale || {x:1, y:1};

    let pos = $maybeApplyPivot(entity.pos, entity.pivot, entity.angle, scale);
    
    
    // Bounds:
    const z_order = entity.z + 0.01;
    if ((entity.shape === 'disk') && entity.size) {
        draw_disk(pos, entity.size.x * 0.5 * scale.x, undefined, color, z_order)
    } else if (entity.size) {
        const u = {x: $Math.cos(angle) * 0.5, y: $Math.sin(angle) * 0.5};
        const v = {x: -u.y, y: u.x};
        u.x *= entity.size.x * scale.x; u.y *= entity.size.x * scale.x;
        v.x *= entity.size.y * scale.y; v.y *= entity.size.y * scale.y;

        const A = {x: pos.x - u.x - v.x, y: pos.y - u.y - v.y, z: entity.pos.z};
        const B = {x: pos.x + u.x - v.x, y: pos.y + u.y - v.y, z: entity.pos.z};
        const C = {x: pos.x + u.x + v.x, y: pos.y + u.y + v.y, z: entity.pos.z};
        const D = {x: pos.x - u.x + v.x, y: pos.y - u.y + v.y, z: entity.pos.z};
        draw_line(A, B, color, z_order);
        draw_line(B, C, color, z_order);
        draw_line(C, D, color, z_order);
        draw_line(D, A, color, z_order);
    } else {
        draw_point(pos, color, z_order);
    }

    // Axes
    {
        const u = {x: $Math.cos(angle) * 16, y: $Math.sin(angle) * 16};
        const v = {x: -u.y, y: u.x};
        u.x *= scale.x; u.y *= scale.x;
        v.x *= scale.y; v.y *= scale.y;

        // Do not apply the pivot to the axes
        const B = {x: entity.pos.x + u.x, y: entity.pos.y + u.y, z: entity.pos.z};
        const C = {x: entity.pos.x + v.x, y: entity.pos.y + v.y, z: entity.pos.z};
        
        draw_line(entity.pos, B, {r:1, g:0, b:0}, z_order);
        draw_line(entity.pos, C, {r:0, g:1, b:0}, z_order);
    }

    if (entity.child_array && recurse) {
        for (let i = 0; i < entity.child_array; ++i) {
            debugDrawEntity(entity.child_array[c], color, recurse);
        }
    }
}