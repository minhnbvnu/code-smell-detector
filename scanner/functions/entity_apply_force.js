function entity_apply_force(entity, worldForce, worldPos) {
    worldPos = worldPos || entity.pos;
    entity.force.x += worldForce.x;
    entity.force.y += worldForce.y;
    const offsetX = worldPos.x - entity.pos.x;
    const offsetY = worldPos.y - entity.pos.y;
    entity.torque += -rotation_sign() * (offsetX * worldForce.y - offsetY * worldForce.x);
}