function moveToolTip(event) {
        tooltip.innerHTML = '';
        tooltip.style.display = 'none';

        const features = view.pickFeaturesAt.apply(view, [event, 3].concat(layersId));

        let layer;
        for (const layerId in features) {
            if (features[layerId].length == 0) {
                continue;
            }

            layer = layers[layersId.indexOf(layerId)];
            if (!layer) {
                continue;
            }
            if (typeof layer.options.filterGeometries == 'function') {
                features[layerId] = layer.options.filterGeometries(features[layerId], layer.layer) || [];
            }
            tooltip.innerHTML += fillToolTip(features[layerId], layer.layer, layer.options);
        }

        if (tooltip.innerHTML != '') {
            tooltip.style.display = 'block';
            tooltip.style.left = view.eventToViewCoords(event).x + 'px';
            tooltip.style.top = view.eventToViewCoords(event).y + 'px';
        }
    }