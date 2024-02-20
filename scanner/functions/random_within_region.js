function random_within_region(region, recurse, rng) {
    if (recurse === undefined) { recurse = true; }
    if (rng === undefined) { rng = random; }

    if (recurse) {
        // Child case
        const entity_array = [], area_array = [];
        $getDescendants(region, entity_array);

        // Compute total area
        let total_area = 0;
        for (let e = 0; e < entity_array.length; ++e) {
            const entity = entity_array[e] = $cleanupRegion(entity_array[e]);
            total_area += area_array[e] = entity_area(entity);
        }

        // Choose proportional to area
        let r = rng(0, total_area);
        for (let e = 0; e < entity_array.length; ++e) {
            r -= area_array[e];
            if (r <= 0 || e === entity_array.length - 1) {
                return random_within_region(entity_array[e], false, rng);
            }
        }
        
    } else {
        // Single region case
        region = $cleanupRegion(region);

        let P;
        switch (region.shape) {
        case 'disk':
            P = random_within_circle(rng);
            break;
            
        case 'rect':
            P = random_within_square(rng);
            break;
            
        case 'point':
            return xy(region.pos);

        default:
            $error('Illegal shape: ' + region.shape);
        }

        P.x *= 0.5 * region.size.x; P.y *= 0.5 * region.size.y;
        return transform_es_to_ws(region, P);

    } // recurse
}