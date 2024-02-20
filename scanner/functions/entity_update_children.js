function entity_update_children(parent) {
    if (parent === undefined || parent.pos === undefined) {
        $error('entity_update_children requires an entity argument')
    }

    if (typeof parent.scale !== 'object') { $error('The scale of the parent entity must be an xy().'); }
    if (is_nan(parent.angle)) { $error('nan angle on parent entity'); }
    if (parent.z !== undefined && is_nan(parent.z)) { $error('nan z on parent entity'); }
    
    const N = parent.child_array.length;
    const rotSign = $Math.sign(parent.scale.x * parent.scale.y);
    const a = parent.angle * rotation_sign() * rotSign;
    const c = $Math.cos(a), s = $Math.sin(a);
    
    for (let i = 0; i < N; ++i) {
        const child = parent.child_array[i];

        if (child.orient_with_parent) {
            child.scale.x = parent.scale.x * child.scale_in_parent.x;
            child.scale.y = parent.scale.y * child.scale_in_parent.y;
            child.angle   = parent.angle + child.angle_in_parent * rotSign;
        }
       
        child.pos.x = (c * child.pos_in_parent.x - s * child.pos_in_parent.y) * parent.scale.x + parent.pos.x;
        child.pos.y = (s * child.pos_in_parent.x + c * child.pos_in_parent.y) * parent.scale.y + parent.pos.y;
        if (child.pos.z !== undefined) {
            if (parent.pos.z === undefined) {
                $error("Child entity has xyz() pos and parent has xy() pos");
            }
            child.pos.z = child.pos_in_parent.z + parent.pos.z;
        }
        
        if (child.z_in_parent !== undefined) {
            if (parent.z === undefined) {
                $error("Child entity has z but parent.z = nil");
            }
            child.z = parent.z + child.z_in_parent;
        }

        if (child.offset_with_parent) {
            child.offset.x = (c * child.offset_in_parent.x - s * child.offset_in_parent.y) * parent.scale.x + parent.offset.x;
            child.offset.y = (s * child.offset_in_parent.x + c * child.offset_in_parent.y) * parent.scale.y + parent.offset.y;
        }
      
        entity_update_children(child);
    }
}