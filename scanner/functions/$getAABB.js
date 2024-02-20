function $getAABB(e, aabb) {
    // Take the bounds to draw space
    let w = (e.scale ? e.scale.x : 1) * e.size.x;
    let h = (e.scale ? e.scale.y : 1) * e.size.y;
    if ((e.shape !== 'disk') && (e.angle !== undefined)) {
        const c = $Math.abs($Math.cos(e.angle));
        const s = $Math.abs($Math.sin(e.angle));
        const x = w * c + h * s;
        const y = h * c + w * s;
        w = x; h = y;
    }
    w *= 0.5;
    h *= 0.5;
    aabb.max.x = $Math.max(aabb.max.x, e.pos.x + w);
    aabb.min.x = $Math.min(aabb.min.x, e.pos.x - w);
    aabb.max.y = $Math.max(aabb.max.y, e.pos.y + h);
    aabb.min.y = $Math.min(aabb.min.y, e.pos.x - h);

    // Recurse
    if (e.child_array) {
        for (let i = 0; i < e.child_array.length; ++i) {
            $getAABB(e.child_array[i], aabb);
        }
    }
}