function $entityUpdateFromBody(entity) {
    const S = rotation_sign();
    
    const body     = entity.$body;
    entity.pos.x   = body.position.x;
    entity.pos.y   = body.position.y;
    entity.vel.x   = body.velocity.x;
    entity.vel.y   = body.velocity.y;
    entity.force.x = body.force.x * $PHYSICS_MASS_INV_SCALE;
    entity.force.y = body.force.y * $PHYSICS_MASS_INV_SCALE;
    entity.spin    = body.angularVelocity * S;
    entity.angle   = body.angle * S;
    entity.torque  = body.torque * $PHYSICS_MASS_INV_SCALE * S;

    if (entity.physics_sleep_state === 'vigilant') {
        if (body.isSleeping) { $Physics.Sleeping.set(body, false); }
    } else {
        entity.physics_sleep_state = body.isSleeping ? 'sleeping' : 'awake';
    }
    /*
    // The physics update would never change these:
    entity.density = body.density
    entity.restitution    = body.restitution
    entity.friction       = body.friction
    entity.drag           = body.frictionAir
    entity.stiction_factor = body.frictionStatic
    */
}