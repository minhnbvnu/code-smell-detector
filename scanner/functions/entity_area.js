function entity_area(entity) {
    const scaleX = entity.scale !== undefined ? entity.scale.x : 1;
    const scaleY = entity.scale !== undefined ? entity.scale.y : 1;

    if (entity.size === undefined) {
        return 0;
    } else if (entity.shape === 'disk') {
        return $Math.abs($Math.PI * 0.25 * scaleX * scaleY * entity.size.x * entity.size.y);
    } else {
        return $Math.abs(scaleX * scaleY * entity.size.x * entity.size.y);
    }
}