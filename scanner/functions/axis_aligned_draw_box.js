function axis_aligned_draw_box(e) {
    const aabb = {max: xy(-Infinity, -Infinity),
                  min: xy( Infinity,  Infinity)};
    $getAABB(e, aabb);
    return {pos: xy((aabb.max.x + aabb.min.x) * 0.5,
                    (aabb.max.y + aabb.min.y) * 0.5),
            shape: 'rect',
            scale: xy(1, 1),
            angle: 0,
            size: xy(aabb.max.x - aabb.min.x,
                     aabb.max.y - aabb.min.y)};            
}