function draw_physics(physics) {
    const showSecrets = false;
    const awakeColor   = rgb(0.10, 1.0, 0.5);
    const sleepColor   = rgb(0.05, 0.6, 0.3);
    const staticColor  = gray(0.8);
    const contactColor = rgb(1, 0.93, 0);
    const sensorColor      = rgb(0.3, 0.7, 1);
    const newContactColor = rgb(1, 0, 0);
    const constraintColor = rgb(0.7, 0.5, 1);
    const secretColor  = rgb(1, 0, 0);
    const zOffset = 0.01;

    const engine       = physics.$engine;
    
    const bodies = $Physics.Composite.allBodies(engine.world);
    for (let b = 0; b < bodies.length; ++b) {
        const body = bodies[b];
        if (! body.entity && ! showSecrets) { continue; }

        const color =
              (! body.entity ? secretColor :
               (body.isSensor ? sensorColor:
                (body.isStatic ? staticColor :
                 (body.isSleeping ? sleepColor :
                  awakeColor))));
        
        const z = body.entity ? body.entity.z + zOffset : 100;
        for (let p = 0; p < body.parts.length; ++p) {
            const part = body.parts[p];
            const C = $Math.cos(part.angle);
            const S = $Math.sin(part.angle);

            let r = 4;
            if (body.circleRadius) {
                draw_disk(part.position, part.circleRadius, undefined, color, z);
                r = $Math.min(r, part.circleRadius - 2);
            } else {
                const V = part.vertices[0];
                draw_line(last_value(part.vertices), V, color, z);
                let maxR2 = magnitude_squared(V.x - part.position.x, V.y - part.position.y);
                for (let i = 1; i < part.vertices.length; ++i) {
                    const V = part.vertices[i];
                    maxR2 = $Math.max(magnitude_squared(V.x - part.position.x, V.y - part.position.y), maxR2);
                    draw_line(part.vertices[i - 1], V, color, z);
                }
                r = $Math.min($Math.sqrt(maxR2) - 2, r);
            }
            
            // Axes
            const axis = xy(r * C, r * S);
            draw_line($objectSub(part.position, axis), $objectAdd(part.position, axis), color, z);
            let temp = axis.x; axis.x = -axis.y; axis.y = temp;
            draw_line($objectSub(part.position, axis), $objectAdd(part.position, axis), color, z);
        }
    } // bodies

    const weldTri = [xy(0, 5), xy(4.330127018922194, -2.5), xy(-4.330127018922194, -2.5)];
    const constraints = $Physics.Composite.allConstraints(engine.world);
    for (let c = 0; c < constraints.length; ++c) {
        const constraint = constraints[c];
        const attachment = constraint.attachment;

        // Not a renderable constraint
        if (! attachment && ! showSecrets) { continue; }
        
        const type = attachment ? attachment.type : '';

        let pointA = constraint.pointA;
        let pointB = constraint.pointB;
        let zA = -Infinity, zB = -Infinity;
        
        if (constraint.bodyA) {
            pointA = $objectAdd(pointA, constraint.bodyA.position);
            zA = attachment ? constraint.bodyA.entity.z : 100;
        }
        
        if (constraint.bodyB) {
            pointB = $objectAdd(pointB, constraint.bodyB.position);
            zB = attachment ? constraint.bodyB.entity.z : 100;
        }
        const z = $Math.max(zA, zB) + zOffset;

        const color = attachment ? constraintColor : secretColor;

        // Line part
        if (type === 'spring') {
            // Choose the number of bends based on the rest length,
            // and then stretch
            const longAxis = $objectSub(pointB, pointA);
            const crossAxis = $objectMul(xy(-longAxis.y, longAxis.x),
                                         $clamp(8 - $Math.pow(constraint.stiffness, 0.1) * 8, 1, 7) / magnitude(longAxis));
            const numBends = $Math.ceil(attachment.length / 2.5);
            let prev = pointA;
            for (let i = 1; i < numBends; ++i) {
                const end = (i === 1 || i === numBends - 1);
                const u = (end ? i + 0.5 : i) / numBends;
                const v = end ? 0 : (2 * (i & 1) - 1);
                const curr = $objectAdd(pointA,
                                        $objectAdd($objectMul(longAxis, u),
                                                   $objectMul(crossAxis, v))); 
                draw_line(prev, curr, color, z);
                prev = curr;
            }
            draw_line(prev, pointB, color, z);
        } else {
            // Line between the two points for a rod, rope, or other
            // constraint where the points may be separated
            draw_line(pointA, pointB, color, z);
        }
        
        if (type === 'weld') {
            // Show a triangle to indicate that this attachment is rigid
            draw_poly(weldTri, color, undefined, pointB, constraint.bodyB.angle, undefined, z);
        } else if (type === 'pin') {
            // Show one disk
            draw_disk(pointA, 3, color, undefined, z);
        } else if (type === 'torsion_spring') {
            // Show the coils
            draw_disk(pointA, 1, undefined, color, z);
            draw_disk(pointA, 3, undefined, color, z);
            draw_disk(pointA, 4, undefined, color, z);            
        } else {
            // Show the two disks
            draw_disk(pointA, 3, undefined, color, z);
            draw_disk(pointB, 2.5, color, undefined, z);
        }
    }

    // For contacts, do not iterate over physics.pairs.list, as that
    // is the potentially O(n^2) cache of all pairs ever created and
    // most of them may not be active.

    const contactBox = xy(3, 3);
    for (const [body0, map] of physics.$entityContactMap) {
        for (const [body1, contact] of map) {
            // Draw each only once, for the body with the lower ID
            if (body0.id < body1.id) {
                const z = $Math.max(contact.entityA.z, contact.entityB.z) + zOffset;
                draw_rect(contact.point0, contactBox, contactColor, undefined, 0, z);
                if (contact.point1) { draw_rect(contact.point1, contactBox, contactColor, undefined, 0, z); }
            }
        }
    }

    const newContactBox = xy(7, 7);
    for (let c = 0; c < physics.$newContactArray.length; ++c) {
        const contact = physics.$newContactArray[c];
        const z = $Math.max(contact.entityA.z, contact.entityB.z) + zOffset;

        // Size based on penetration
        newContactBox.x = newContactBox.y = $clamp(1 + contact.depth * 2, 1, 10);
        
        draw_rect(contact.point0, newContactBox, newContactColor, undefined, 0, z);
        if (contact.point1) { draw_rect(contact.point1, newContactBox, newContactColor, undefined, 0, z); }
    }
}