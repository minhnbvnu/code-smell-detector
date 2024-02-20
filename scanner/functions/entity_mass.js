function entity_mass(entity) {
    return entity_area(entity) * ((entity.density !== undefined) ? entity.density : 1);
}