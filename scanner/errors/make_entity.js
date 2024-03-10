function make_entity(e, childTable) {
    const r = Object.assign({}, e || {});    

    if (e.shape && (e.shape !== 'rect') && (e.shape !== 'disk')) {
        $error('Illegal shape for entity: "' + e.shape + '"');
    }

    // Clone vector components. If pos is an xyz(), use xyz() for other
    // terms
    r.pos = r.pos ? clone(r.pos) : xy(0, 0);
    r.vel = r.vel ? clone(r.vel) : $mul(clone(r.pos), 0);
    r.force = r.force ? clone(r.force) : $mul(clone(r.pos), 0);

    r.restitution = (r.restitution === undefined) ? 0.1 : r.restitution;
    r.friction    = (r.friction === undefined) ? 0.15 : r.friction;
    r.drag        = (r.drag === undefined) ? 0.005 : r.drag;
    r.stiction_factor = (r.stiction_factor === undefined) ? 1 : r.stiction_factor;

    r.angle = r.angle || 0;
    r.spin = r.spin || 0;
    r.torque = r.torque || 0;
    
    r.override_color = clone(r.override_color);
    
    r.scale = r.scale ? clone(r.scale) : xy(1, 1);
    r.offset = r.offset ? clone(r.offset) : xy(0, 0);
    
    // Assign empty fields with reasonable defaults
    r.name = r.name || ('entity' + ($entityID++));
    r.shape = r.shape || 'rect';
    r.sprite = r.sprite || undefined;
    if (r.pos.z === undefined) {
        // Only set r.z if r.pos.z is undefined or
        // r.z is explicitly set.
        r.z = r.z || 0;
    }

    r.physics_sleep_state = r.physics_sleep_state || 'awake';

    r.text_x_align = r.text_x_align || "center";
    r.text_y_align = r.text_y_align || "center";

    r.contact_group = r.contact_group || 0;
    r.contact_category_mask = (r.contact_category_mask === undefined) ? 1 : r.contact_category_mask;
    r.contact_hit_mask = (r.contact_hit_mask === undefined) ? 0xffffffff : r.contact_hit_mask;
    r.is_sensor = (r.is_sensor === undefined) ? false : r.is_sensor;

    if (r.density === undefined) { r.density = 1; }
    
    if (r.opacity === undefined) { r.opacity = 1; }
    
    if (typeof r.scale === 'number') {
        r.scale = {x: r.scale, y: r.scale};
    }
    if (typeof r.scale !== 'object') {
        $error('The scale of an entity must be a number or xy().');
    }
    
    if (r.size === undefined) {
        if (r.sprite) {
            if (r.shape === 'rect') {
                r.size = {x: r.sprite.size.x, y: r.sprite.size.y};
            } else if (r.shape === 'disk') {
                const x = min_value(r.sprite.size);
                r.size = xy(x, x);
                if ($Math.abs(r.scale.x) !== $Math.abs(r.scale.y)) {
                    $error('Cannot have different magnitude scale factors for x and y on a "disk" shaped entity.');
                }
            }
        } else {
            // no size, no sprite
            r.size = xy(0, 0);
        }
    } else {
        r.size = clone(r.size);
    }

    if (is_nan(r.size.x)) { $error('nan entity.size.x'); }
    if (is_nan(r.size.y)) { $error('nan entity.size.y'); }

    if (r.pivot === undefined) {
        if (r.sprite) {
            r.pivot = clone(r.sprite.pivot);
        } else {
            r.pivot = xy(0, 0);
        }
    } else {
        r.pivot = clone(r.pivot);
    }

    const child_array = r.child_array ? clone(r.child_array) : [];
    r.child_array = [];
    if (r.orient_with_parent === undefined) { r.orient_with_parent = true; }
    if (r.offset_with_parent === undefined) { r.offset_with_parent = true; }
   
    r.z_in_parent = r.z_in_parent || 0;
    r.pos_in_parent = r.pos_in_parent ? clone(r.pos_in_parent) : xy(0, 0);
    r.angle_in_parent = r.angle_in_parent || 0;
    r.offset_in_parent = r.offset_in_parent ? clone(r.offset_in_parent) : xy(0, 0);
    r.scale_in_parent = r.scale_in_parent ? clone(r.scale_in_parent) : xy(1, 1);

    if (is_number(r.scale_in_parent)) {
        r.scale_in_parent = xy(r.scale_in_parent, r.scale_in_parent);
    }

    if (is_nan(r.angle)) { $error('nan angle on entity'); }
    if (r.z !== undefined && is_nan(r.z)) { $error('nan z on entity'); }
    
    // Construct named children
    if (childTable) {
        for (let name in childTable) {
            const child = childTable[name];
            if (! $isEntity(child)) {
                $error('The child named "' + name + '" in the childTable passed to make_entity is not itself an entity');
            }
            
            r[name] = child;
            if (child.name === 'Anonymous') {
                child.name = name;
            }
            child_array.push(child)
        }
    }

    // Add and update all children
    for (let i = 0; i < child_array.length; ++i) {
        entity_add_child(r, child_array[i]);
    }
    entity_update_children(r);
    
    return r;
}