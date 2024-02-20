function physics_attach(physics, type, param) {
    if (param.entityA && ! param.entityA.$body) { $error('entityA has not been added to the physics context'); }
    if (! param.entityB) { $error('entityB must not be nil'); }
    if (! param.entityB.$body) { $error('entityB has not been added to the physics context'); }
    if (param.entityB.density === Infinity) { $error('entityB must have finite density'); }

    physics = physics.$engine;

    // Object that will be returned
    const attachment = {
        type:    type,
        entityA: param.entityA,
        entityB: param.entityB
    };

    const wsB = transform_es_to_ws(param.entityB, param.pointB || xy(0, 0));
    
    if (type === 'weld') {
        // Satisfy the initial angle constraint. Do this before computing
        // positions
        if (param.length !== undefined) { $error('Weld attachments do not accept a length parameter'); }
        if (param.angle !== undefined) {
            param.entityB.angle = param.angle + (param.entityA ? param.entityA.angle : 0);
            $bodyUpdateFromEntity(attachment.entityB.$body);
        }
    }
    
    // Create options for constructing a matter.js constraint.
    // matter.js wants the points relative to the centers of the
    // bodies, but not rotated by the bodies
    const options = {
        bodyB:  param.entityB.$body,
        pointB: $objectSub(wsB, param.entityB.pos)
    };

    if (type === 'weld') {
        // Use this hack to stiffen; setting angularStiffness very high
        // is likely to affect torque in strange ways, so don't go too high
        options.angularStiffness = 0.1;
    }
    
    /////////////////////////////////////////////////////////////////////
    // Are collisions allowed between these objects? By default,
    // welds, pins, and torsion springs prevent collisions.
    
    let collide = find(['rope', 'string', 'rod'], type) !== undefined;
    if (param.collide !== undefined) { collide = param.collide; }
    
    // Always enable collisions with the world, since they won't happen
    // and it is free to do so
    if (! param.entityA) { collide = true; }

    if (param.entityA &&
        (param.entityA.$body.collisionFilter.group < 0) &&
        (param.entityA.$body.collisionFilter.group === param.entityB.$body.collisionFilter.group)) {
        // These are in the same collision group; they couldn't collide anyway, so there is no
        // need to explicitly prevent collisions
        collide = true;
    }

    if (param.entityA &&
        ((param.entityB.$body.collisionFilter.mask & param.entityA.$body.collisionFilter.category) === 0) &&
        ((param.entityA.$body.collisionFilter.mask & param.entityB.$body.collisionFilter.category) === 0)) {
        // These could not collide with each other because they have no overlap in their masks
        collide = true;
    }

    // Update the entity's collision filters. See console/matter-extensions.js
    if (! collide) {
        // Reference counting on the excludedBodies maps
        param.entityA.$body.collisionFilter.body = param.entityA.$body;
        if (! param.entityA.$body.collisionFilter.excludedBodies) { param.entityA.$body.collisionFilter.excludedBodies = new WeakMap(); }
        param.entityA.$body.collisionFilter.excludedBodies.set(param.entityB.$body, (param.entityA.$body.collisionFilter.excludedBodies.get(param.entityB.$body) || 0) + 1);

        param.entityB.$body.collisionFilter.body = param.entityB.$body;
        if (! param.entityB.$body.collisionFilter.excludedBodies) { param.entityB.$body.collisionFilter.excludedBodies = new WeakMap(); }        
        param.entityB.$body.collisionFilter.excludedBodies.set(param.entityA.$body, (param.entityB.$body.collisionFilter.excludedBodies.get(param.entityA.$body) || 0) + 1);
    }

    /////////////////////////////////////////////////////////////////////

    // World-space attachment points
    let wsA;
    if (param.entityA) {
        options.bodyA = param.entityA.$body;
        if (param.pointA) {
            wsA = transform_es_to_ws(param.entityA, param.pointA);
        } else {
            wsA = wsB;
        }
    } else if (param.pointA) {
        // no entityA but there is a pointA, treat it as
        // in world space because we're attaching to the world
        wsA = param.pointA;
    } else {
        // Default to the same point on the world
        wsA = wsB;
    }
    options.pointA = param.entityA ? 
        $objectSub(wsA, param.entityA.pos) :
        wsA;

    const delta = $objectSub(wsB, wsA);
    const len = magnitude(delta);
   
    switch (type) {
    case 'gyro':
        {
            attachment.angle = (param.angle === undefined) ? loop(param.entityB.angle, -$Math.PI, $Math.PI) : 0;
            // We *could* make this work against an arbitrary entity, but for now
            // constrain to the world for simplicity
            if (param.entityA) { $error('A "gyro" attachment requires that entityA = nil'); }
            push(physics.customAttachments, attachment);
        }
        break;
        
    case 'spring':
    case 'rod':
    case 'weld':
        {
            if (type === 'spring') {
                options.damping = (param.damping !== undefined) ? param.damping : 0.002;
                options.stiffness = (param.stiffness !== undefined) ? param.stiffness : 0.005;
            } else {
                // For stability, don't make the joints too stiff
                options.damping   = 0.2;
                options.stiffness = 0.95;
            }
            
            attachment.damping = options.damping;
            attachment.stiffness = options.stiffness;
            if ((param.length === undefined) && (type !== 'weld')) {
                // Default to the current positions for springs and rods
                attachment.length = len;
            } else {
                attachment.length = (type === 'weld') ? 0 : param.length;

                // Amount positions need to change by to satisfy the
                // rest length initially. matter.js uses the current
                // positions of the bodies to determine the rest length
                const change = attachment.length - len;
                
                if ($Math.abs(change) > 1e-9) {
                    // Teleport entityB to satisfy the rest length
                    if (len <= 1e-9) {
                        // If A and B are on top of each other and there's
                        // a nonzero rest length, arbitrarily choose to
                        // move along the x-axis
                        attachment.entityB.pos.x += change;
                    } else{
                        attachment.entityB.pos.x += delta.x * change / len;
                        attachment.entityB.pos.y += delta.y * change / len;
                    }
                    $bodyUpdateFromEntity(attachment.entityB.$body);
                }
            }

            attachment.$composite = $Physics.Composite.create();
            const constraint = $Physics.Constraint.create(options);
            constraint.attachment = attachment;
            $Physics.Composite.add(attachment.$composite, constraint);
            
            if (attachment.type === 'weld') {
                if (! param.entityA) { $error('Entities may not be welded to the world. Use infinite density instead.'); }

                // Connect back with double-constraints to go through
                // an intermediate "weld body" object.  The weld body
                // must be centered at the constraint point so that
                // its rotation is ignored.  Make the weld body a disk
                // so that rotation has no net effect on shape (and
                // thus moment of inertia) as well as it spins.
                //
                // Only one weld body is required to prevent roation,
                // but that body must be away from the weld center and
                // thus will create asymmetry. A full circle of pins
                // would be the most symmetric, but is expensive, so
                // we add a small number of weld bodies.
                //
                // Each fake body must have some mass to it or the
                // constraints won't have much effect. Unfortunately,
                // this changes the net mass and moment of inertia of
                // the compound shape, which is why parenting is a
                // better solution than welding.

                // Higher gives more rigidity but also affects moment
                // of inertia more
                const offsetRadius = 16;
                const numPins = 4;
                const weldPinRadius = 3;

                let mA = entity_mass(param.entityA);
                let mB = entity_mass(param.entityB);
                
                // Handle the case where one object has infinite mass
                if (mA === Infinity) { mA = mB; }
                if (mB === Infinity) { mB = mA; }
                
                // Handle the case where both were infinite (welds should
                // not be allowed in this case)
                if (mA === Infinity) { mA = mB = 5; }
                    
                // Higher weld density gives more rigidity but also affects mass
                // and moment of inertia more.
                const weldDensity = $PHYSICS_MASS_SCALE * $Math.max(mA + mB, 1) / 3500;

                // In world space
                const weldPos = $objectAdd(options.pointB, param.entityB.$body.position);
                const weldDamping = 0.2;
                
                // Iterate around the circle
                for (let p = 0; p < numPins; ++p) {
                    const offsetAngle = 2 * $Math.PI * p / numPins;
                    const offset = xy(offsetRadius * $Math.cos(offsetAngle), offsetRadius * $Math.sin(offsetAngle));

                    const weldBody = $Physics.Bodies.circle(weldPos.x + offset.x, weldPos.y + offset.y, weldPinRadius, {density: weldDensity});
                    // Prevent collisions with everything
                    weldBody.collisionFilter.mask = weldBody.collisionFilter.category = 0;
                    // Add the invisible weldBody
                    $Physics.Composite.add(attachment.$composite, weldBody);

                    // B -> Weld
                    $Physics.Composite.add(attachment.$composite, $Physics.Constraint.create({
                        bodyA:     param.entityB.$body,
                        pointA:    $objectSub(weldBody.position, param.entityB.$body.position),
                        bodyB:     weldBody,
                        damping:   weldDamping,
                        stiffness: 0.9
                    }));
                    
                    // Weld -> A
                    $Physics.Composite.add(attachment.$composite, $Physics.Constraint.create({
                        bodyA:     weldBody,
                        bodyB:     param.entityA.$body, 
                        pointB:    $objectSub(weldBody.position, param.entityA.$body.position),
                        damping:   weldDamping,
                        stiffness: 0.9
                    }));

                } // for each weld pin
            }
            
        }
        break;
      
    case 'torsion_spring':
        attachment.angle = loop((param.angle === undefined) ?
                                param.entityB.angle - (param.entityA ? param.entityA.angle : 0) : 0, -$Math.PI, $Math.PI);
        attachment.damping = (options.damping !== undefined ? options.damping : 0.002);
        attachment.stiffness = (options.stiffness !== undefined ? options.stiffness : 0.005);
        // intentionally fall through
        
    case 'pin':
        {
            if ($Math.abs(len) > 1e-9) {
                attachment.entityB.pos.x -= delta.x;
                attachment.entityB.pos.y -= delta.y;
                $bodyUpdateFromEntity(attachment.entityB.$body);
            }

            // matter.js uses the current positions of the bodies to determine the rest length
            attachment.$composite = $Physics.Composite.create();
            const constraint = $Physics.Constraint.create(options);
            constraint.attachment = attachment;
            $Physics.Composite.add(attachment.$composite, constraint);
            push(physics.customAttachments, attachment);
        }
        break;
        
    default:
        $error('Attachment type "' + type + '" not supported');
    }

    
    if (attachment.$composite) {
        // Push the attachment's composite into the world
        $Physics.Composite.add(physics.world, attachment.$composite);
    }

    if (attachment.entityA) { push(attachment.entityA.$attachmentArray, attachment); }
    push(attachment.entityB.$attachmentArray, attachment);
    
    return Object.freeze(attachment);
}