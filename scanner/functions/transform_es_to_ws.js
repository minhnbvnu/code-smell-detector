function transform_es_to_ws(entity, coord) {
    if (! coord || coord.x === undefined) { $error("transform_es_to_ws() requires both an entity and a coordinate"); }
    return transform_from(entity.pos, entity.angle, entity.scale, coord);
}