function transform_ws_to_es(entity, coord) {
    if (! entity || entity.pos === undefined |! coord || coord.x === undefined) { $error("Requires both an entity and a coordinate"); }
    return transform_to(entity.pos, entity.angle, entity.scale, coord);
}