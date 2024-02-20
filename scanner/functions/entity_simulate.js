function entity_simulate(entity, dt, region, border_behavior) {
    if (is_nan(entity.spin)) { $error('nan entity.spin'); }
    if (is_nan(entity.torque)) { $error('nan entity.torque'); }

    // Assume this computation takes 0.01 ms. We have no way to time it
    // properly, but this at least gives some feedback in the profiler
    // if it is being called continuously.
    $physicsTimeTotal += 0.01;
    
    if (dt === undefined) { dt = 1; }
    if (entity.density === Infinity) { return; }
    
    const mass = entity_mass(entity);
    if (mass <= 0) { $error('Mass must be positive in entity_simulate()'); }
    const imass = 1 / mass;
    const iinertia = 1 / entity_inertia(entity, mass);
    const vel = entity.vel, pos = entity.pos, force = entity.force;

    // Drag should fall off with the time step to remain constant
    // as the time step varies (in the absence of acceleration)
    const k = $Math.pow(1 - entity.drag, dt);
    
    // Integrate
    const accX = force.x * imass;
    vel.x = vel.x * k + accX * dt;
    pos.x += vel.x * dt;
    force.x = 0;

    const accY = force.y * imass;
    vel.y = vel.y * k + accY * dt;
    pos.y += vel.y * dt;
    force.y = 0;

    if (pos.z !== undefined) {
        const accZ = (force.z || 0) * imass;
        vel.z = (vel.z || 0) * k + accZ * dt;
        pos.z += vel.z * dt;
        force.z = 0;
    }

    const twist = entity.torque * iinertia;

    // Integrate
    entity.spin  *= k;
    entity.spin  += twist * dt;
    entity.angle += entity.spin * dt

    // Zero for next step
    entity.torque = 0;

    if (region) {
        if (region.shape && region.shape !== 'rect') {
            $error('The region for entity_simulate() must be a "rect"');
        }

        const func = (border_behavior === 'loop') ? loop : clamp;
        entity.pos.x = func(entity.pos.x, (region.pos ? region.pos.x : 0) - 0.5 * region.size.x, (region.pos ? region.pos.x : 0) + 0.5 * region.size.x);
        entity.pos.y = func(entity.pos.y, (region.pos ? region.pos.y : 0) - 0.5 * region.size.y, (region.pos ? region.pos.y : 0) + 0.5 * region.size.y);
    }

    entity_update_children(entity);
}