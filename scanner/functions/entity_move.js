function entity_move(entity, pos, angle) {
    if (pos !== undefined) {
        entity.vel.x = pos.x - entity.pos.x;
        entity.vel.y = pos.y - entity.pos.y;
        entity.pos.x = pos.x;
        entity.pos.y = pos.y;
    }
      
    if (angle !== undefined) {
        // Rotate the short way
        entity.spin = loop(angle - entity.angle, -PI, $Math.PI);
        entity.angle = angle;
    }
}