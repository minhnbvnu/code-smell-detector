function transform_to_child(child, pos) {
    const a = child.parent.angle - child.angle;
    const c = $Math.cos(a);
    const s = $Math.sin(a);
    const x = pos.x - child.pos_in_parent.x;
    const y = pos.y - child.pos_in_parent.y;
    
    return xy( c * x + s * y,
              -s * x + c * y)
}