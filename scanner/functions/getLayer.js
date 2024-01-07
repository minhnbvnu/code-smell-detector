function getLayer(id) {
            counter++;
            var layer = new maptalks.VectorLayer(id, { 'debug': true, 'drawImmediate': true });
            layer.on('layerload', onLayerLoad);
            layer.addTo(map);
            return layer;
        }