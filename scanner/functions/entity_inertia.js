function entity_inertia(entity, mass) {
    const scaleX = entity.scale ? entity.scale.x : 1;
    const scaleY = entity.scale ? entity.scale.y : 1;
    
    // Inertia tensor about the center (https://en.wikipedia.org/wiki/List_of_moments_of_inertia)
    // rect: 1/12 * m * (w^2 + h^2)
    // disk: m * (w/2)^2
    if (mass === undefined) { mass = entity_mass(entity); }

    if (mass === 0) { $error('entity.mass == 0 while computing moment of inertia'); }
    if (scaleX === 0) { $error('entity.scale.x == 0 while computing moment of inertia'); }
    if (is_nan(scaleX)) { $error('NaN entity.scale.x while computing moment of inertia'); }
    if (entity.size.x === 0) { $error('entity.size.x == 0 while computing moment of inertia'); }
    if (is_nan(entity.size.x)) { $error('NaN entity.size.x while computing moment of inertia'); }
    
    if (entity.shape === 'rect') {
        return mass * ($square(entity.size.x * scaleX) + $square(entity.size.y * scaleY)) * (1 / 12);
    } else {
        return mass * $square(entity.size.x * scaleX * 0.5);
    }
}