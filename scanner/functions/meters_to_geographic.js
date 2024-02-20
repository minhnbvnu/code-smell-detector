function meters_to_geographic(mx, my) {
        return projections_1.wgs84_mercator.invert(mx, my);
    }