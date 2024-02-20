function transform_sprite_space_to_es(entity, coord) {
    if (! entity || entity.pos === undefined |! coord || coord.x === undefined) { $error("Requires both an entity and a coordinate"); }
    if (! entity.sprite) { $error('Called transform_sprite_space_to_es() on an entity with no sprite property.'); }
    return xy((coord.x - entity.sprite.size.x * 0.5) / $scaleX,
              (coord.y - entity.sprite.size.y * 0.5) / $scaleY);
}