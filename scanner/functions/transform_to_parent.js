function transform_to_parent(child, pos) {
    const a = child.angle - child.parent.angle;
    const c = $Math.cos(a);
    const s = $Math.sin(a);
    return xy( c * pos.x + s * pos.y + child.pos_in_parent.x,
              -s * pos.x + c * pos.y + child.pos_in_parent.y)
}