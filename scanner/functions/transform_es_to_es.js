function transform_es_to_es(entity_from, entity_to, point) {
    return transform_ws_to_es(entity_to, transform_es_to_ws(entity_from, point));
}