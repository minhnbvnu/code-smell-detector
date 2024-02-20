function geographic_to_meters(x_lon, y_lat) {
        return projections_1.wgs84_mercator.compute(x_lon, y_lat);
    }