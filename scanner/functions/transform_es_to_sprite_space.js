function transform_es_to_sprite_space(entity, coord) {
    if (! entity || entity.pos === undefined |! coord || coord.x === undefined) { $error("Requires both an entity and a coordinate"); }
    return xy(coord.x * $scaleX + entity.sprite.size.x * 0.5,
              coord.y * $scaleY + entity.sprite.size.y * 0.5);
}