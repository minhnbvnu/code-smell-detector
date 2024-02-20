function $bodyUpdateFromEntity(body) {
    const entity  = body.entity;

    // For numerical stability, do not set properties unless they appear to have changed
    // on the quadplay side

    const changeThreshold = 0.00001;
    let awake = entity.physics_sleep_state === 'vigilant' || entity.physics_sleep_state === 'awake';
    const S = rotation_sign();

    // Wake up on changes
    if ($Math.abs(body.position.x - entity.pos.x) > changeThreshold ||
        $Math.abs(body.position.y - entity.pos.y) > changeThreshold) {
        $Physics.Body.setPosition(body, entity.pos)
        awake = true;
    }
    
    // Must set velocity after position, because matter.js is a vertlet integrator
    if ($Math.abs(body.velocity.x - entity.vel.x) > changeThreshold ||
        $Math.abs(body.velocity.y - entity.vel.y) > changeThreshold) {
        // Note: a future Matter.js API will change body.velocity and require using body.getVelocity
        $Physics.Body.setVelocity(body, entity.vel);
        awake = true;
    }

    if ($Math.abs(body.angularVelocity - entity.spin * S) > changeThreshold) {
        $Physics.Body.setAngularVelocity(body, entity.spin * S);
        awake = true;
    }

    if ($Math.abs(body.angle - entity.angle * S) > changeThreshold) {
        $Physics.Body.setAngle(body, entity.angle * S);
        awake = true;
    }

    if (! body.isStatic) {
        const d = entity.density * $PHYSICS_MASS_SCALE;
        if ($Math.abs(body.density - d) > changeThreshold) {
            $Physics.Body.setDensity(body, d);
            awake = true;
        }
    }

    body.collisionFilter.group = -entity.contact_group;
    body.collisionFilter.mask  = entity.contact_hit_mask;
    body.collisionFilter.category = entity.contact_category_mask;
         
    body.force.x = entity.force.x * $PHYSICS_MASS_SCALE;
    body.force.y = entity.force.y * $PHYSICS_MASS_SCALE;
    body.torque  = entity.torque * S * $PHYSICS_MASS_SCALE;

    body.friction       = entity.friction;
    body.frictionStatic = entity.stiction_factor;
    body.frictionAir    = entity.drag;
    body.restitution    = entity.restitution;

    body.isSensor       = entity.is_sensor;
    
    // The Matter.js API does not notice if an object woke up due to velocity, only
    // due to forces.
    awake = awake || $Math.max($Math.abs(body.angularVelocity), $Math.abs(body.velocity.x), $Math.abs(body.velocity.y)) > 0.01;
    // $Math.max($Math.abs(body.torque), $Math.abs(body.force.x), $Math.abs(body.force.y)) > 1e-9 ||
    
    // Change wake state if needed
    if (body.isSleeping === awake) {
        $Physics.Sleeping.set(body, ! awake);
    }
}