function entity_apply_impulse(entity, worldImpulse, worldPos) {
    worldPos = worldPos || entity.pos;
    const invMass = 1 / entity_mass(entity);
    entity.vel.x += worldImpulse.x * invMass;
    entity.vel.y += worldImpulse.y * invMass;

    const inertia = entity_inertia(entity);
    const offsetX = worldPos.x - entity.pos.x;
    const offsetY = worldPos.y - entity.pos.y;

    entity.spin += -rotation_sign() * (offsetX * worldImpulse.y - offsetY * worldImpulse.x) / inertia;
}