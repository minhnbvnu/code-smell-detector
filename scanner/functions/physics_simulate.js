function physics_simulate(physics, stepFrames) {
    physics.$inSimulate = true;
    const startTime = $performance.now();
    
    if (stepFrames === undefined) { stepFrames = 1; }
    const engine = physics.$engine;

    // $console.log('--------------- timestamp: ' + physics.timing.timestamp);

    // Apply custom attachment forces
    for (let a = 0; a < engine.customAttachments.length; ++a) {
        const attachment = engine.customAttachments[a];
        if (attachment.type === 'torsion_spring') {
            const angle = attachment.angle;
            const entityA = attachment.entityA;
            const entityB = attachment.entityB;
            
            // Hook's law
            const delta = loop(angle + (entityA ? entityA.angle : 0) - entityB.angle, -$Math.PI, $Math.PI);
            let torque = 5000 * delta * attachment.stiffness;
            
            // Note that linear damping applies to all velocity in matter.js, not to
            // spring force itself. However, this is hard to stabilize for
            // a torque because if we just affect angular velocity it will
            // not be around the point in question and causes problems.
            //
            // https://github.com/liabru/matter-js/blob/master/src/constraint/Constraint.js#L221

            const relativeVel = entityB.spin - (entityA ? entityA.spin : 0);
            if ($Math.sign(relativeVel) === $Math.sign(torque)) {
                // Damp when already spinning in the torque direction
                torque /= 1 + 1000 * $Math.abs(relativeVel) * attachment.damping;
            }
            
            if (entityA) { entityA.torque -= torque; }
            entityB.torque += torque;
        } // if torsion_spring
    } // for a
     
    physics.$newContactArray = [];

    const bodies = $Physics.Composite.allBodies(engine.world);
    for (let b = 0; b < bodies.length; ++b) {
        const body = bodies[b];
        // Not all bodies have entities; some are created
        // internally by the physics system.
        if (body.entity) { $bodyUpdateFromEntity(body); }
    }
        
    $Physics.Engine.update(engine, stepFrames * 1000 / 60);
    
    // Enforce custom attachment constraints. This would be better
    // implemented by injecting the new constraint solver directly
    // into $Physics.Constraint.solveAll, so that it happens within
    // the solver during the main iterations. However, that requires
    // modifying the core of the physics engine and makes it harder
    // to upgrade. matter.js has promised to add hinge joints circa 2022
    // and those would allow enforcing these automatically.
    if (engine.customAttachments.length > 0) {
        // Two iterations
        for (let it = 0; it < 2; ++it) {
            for (let a = 0; a < engine.customAttachments.length; ++a) {
                const attachment = engine.customAttachments[a];
                if (attachment.type === 'gyro') {
                    const body = attachment.entityB.$body;
                    const angle = attachment.angle;
                    $Physics.Body.setAngularVelocity(body, 0);
                    $Physics.Body.setAngle(body, angle);
                }  // if gyro
            } // for iteration
            
            // Force one extra iteration of constraint solving to reconcile
            // what we just did above, so that attached parts are not lagged
            if (it === 0) {
                let allConstraints = $Physics.Composite.allConstraints(engine.world);
                
                $Physics.Constraint.preSolveAll(bodies);
                for (let i = 0; i < engine.constraintIterations; ++i) {
                    $Physics.Constraint.solveAll(allConstraints, engine.timing.timeScale);
                }
                $Physics.Constraint.postSolveAll(bodies);
            }
        }
    }
   
    for (let b = 0; b < bodies.length; ++b) {
        const body = bodies[b];
        // Some bodies are created internally within the physics system
        // and have no corresponding entity.
        if (body.entity) { $entityUpdateFromBody(body.entity); }
    }

    // Remove old contacts that were never reestablished.
    // Advance the contact queue
    const maybeBrokenContactList = physics.$brokenContactQueue.shift(1);
    physics.$brokenContactQueue.push([]);
    
    for (let c = 0; c < maybeBrokenContactList.length; ++c) {
        const contact = maybeBrokenContactList[c];
        // See if contact was reestablished within the lifetime of the queue:
        if (contact.$lastRealContactFrame <= physics.$frame - physics.$brokenContactQueue.length) {
            // Contact was not reestablished in time, so remove it
            const bodyA = contact.entityA.$body, bodyB = contact.entityB.$body;

            // For debugging collisions:
            // $console.log(physics.$frame + ' - end  ' + contact.entityA.name + " & " + contact.entityB.name + '\n\n');

            // Remove the contact both ways
            const mapA = physics.$entityContactMap.get(bodyA);
            if (mapA) { mapA.delete(bodyB); }
            
            const mapB = physics.$entityContactMap.get(bodyB);
            if (mapB) { mapB.delete(bodyA); }
        }
    }

    if ($showPhysicsEnabled) {
        draw_physics(physics);
    }

    // Fire event handlers for new contacts
    for (const callback of physics.$contactCallbackArray.values()) {
        for (const contact of physics.$newContactArray.values()) {
            if (((contact.entityA.contact_category_mask | contact.entityB.contact_category_mask) & callback.contact_mask) &&
                (contact.depth >= callback.min_depth) &&
                (contact.depth <= callback.max_depth) &&
                ((callback.sensors === 'include') ||
                 ((callback.sensors === 'only') && (contact.entityA.is_sensor || contact.entityB.is_sensor)) ||
                 ((callback.sensors === 'exclude') && ! (contact.entityA.is_sensor || contact.entityB.is_sensor)))) {
                
                callback.callback({
                    entityA: contact.entityA,
                    entityB: contact.entityB,
                    normal:  xy(contact.normal),
                    depth:   contact.depth,
                    point0:  xy(contact.point0),
                    point1:  contact.point1 ? xy(contact.point1) : undefined,
                });
            }
        } // event
    } // contact

    physics.$inSimulate = false;
    ++physics.$frame;

    for (let i = 0; i < physics.$removeEntityArray.length; ++i) {
        physics_remove_entity(physics, physics.$removeEntityArray[i]);
    }
    physics.$removeEntityArray.length = 0;

    const endTime = $performance.now();
    $physicsTimeTotal += endTime - startTime;
}