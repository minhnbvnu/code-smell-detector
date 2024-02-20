function $physics_entity_contacts(physics, entity, region, normal, mask, sensors, earlyOut) {
    if (mask === undefined) { mask = 0xffffffff; }
    if (mask === 0) { $error('physics_entity_contacts() with mask = 0 will never return anything.'); }
    if (! entity) { $error('physics_entity_contacts() must have a non-nil entity'); }

    const engine = physics.$engine;
    sensors = sensors || 'exclude';

    // Look at all contacts for this entity
    const body = entity.$body;
    const map = physics.$entityContactMap.get(body);
    const result = earlyOut ? false : [];

    if (map === undefined) {
        // No contacts
        return result;
    }
    
    // Create a test shape with all of the required properties to avoid allocation by the
    // repeated overlaps() calls
    const testPointShape = {shape: 'disk', angle: 0, size: xy(0, 0), scale: xy(1, 1), pos: xy(0, 0)};
    const testPoint = testPointShape.pos;

    const Rx = $Math.cos(entity.angle) / entity.scale.x, Ry = $Math.sin(entity.angle) * rotation_sign() / entity.scale.y;
    const Tx = entity.pos.x, Ty = entity.pos.y;

    // Avoid having overlaps() perform the cleanup test many times
    if (region) { region = $cleanupRegion(region); }
    if (normal) { normal = direction(normal); }
    
    // cosine of 75 degrees
    const angleThreshold = $Math.cos($Math.PI * 80 / 180);
    
    for (const contact of map.values()) {
        const isA = contact.entityA === entity;
        const isB = contact.entityB === entity;
        const other = isA ? contact.entityB : contact.entityA; 

        // Are we in the right category?
        if ((other.contact_category_mask & mask) === 0) {
            // $console.log("Mask rejection");
            continue;
        }

        if (((sensors === 'exclude') && other.is_sensor) ||
            ((sensors === 'only') && ! other.is_sensor)) {
            // $console.log("Sensor rejection");
            continue;
        }
 

        if (region) {
            let x, y;
            if (contact.point1) {
                x = (contact.point0.x + contact.point1.x) * 0.5;
                y = (contact.point0.y + contact.point1.y) * 0.5;
            } else {
                x = contact.point0.x; y = contact.point0.y;
            }

            x -= Tx; y -= Ty;
            
            // Transform the average point to the reference frame of
            // the region.  This will make testing faster for the
            // common case of an axis-aligned box.
            testPoint.x = Rx * x + Ry * y;
            testPoint.y = Rx * y - Ry * x;
            
            // Is the average contact point within the region?
            if (! overlaps(region, testPointShape, false)) {
                // $console.log("Region rejection");
                continue;
            }
        }

        if (normal) {
            // Collision normal
            let Cx = contact.normal.x, Cy = contact.normal.y;
            if (isB) { Cx = -Cx; Cy = -Cy; }
            if (Cx * normal.x + Cy * normal.y < angleThreshold) {
                // $console.log("Angle rejection");
                continue;
            }
        }

        if (earlyOut) { return true; }
        
        // Push a copy of the contact. Do not deep clone,
        // as that would copy the entitys as well.
        $console.assert(contact.normal && contact.point0);
        const copy = {
            entityA: contact.entityA,
            entityB: contact.entityB,
            normal:  xy(contact.normal),
            point0:  xy(contact.point0),
            depth:   contact.depth
        };
        if (contact.point1) { copy.point1 = {x:contact.point1.x, y:contact.point1.y}; }
        result.push(copy);
    }

    return result;
}