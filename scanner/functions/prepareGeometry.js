function prepareGeometry() {
        if (!(target instanceof maptalks.Geometry)) {
            return;
        }
        var map = _context.map;
        if (target.getLayer()) { target.remove(); }
        map.removeLayer('vector');
        var layer = new maptalks.VectorLayer('vector', { 'drawImmediate' : true });
        layer.addTo(map).addGeometry(target);
    }