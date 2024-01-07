function setupGeometry() {
        // var layer = new maptalks.VectorLayer('common_test_layer');
        if (geometry.getLayer()) {
            geometry.remove();
        }
        _context.layer.addGeometry(geometry);
        // map.addLayer(layer);
    }