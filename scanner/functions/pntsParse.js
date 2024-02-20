function pntsParse(data, layer) {
    return PntsParser.parse(data, layer.registeredExtensions).then((result) => {
        const material = layer.material ?
            layer.material.clone() :
            new PointsMaterial({
                size: 0.05,
                mode: layer.pntsMode,
                shape: layer.pntsShape,
                classification: layer.classification,
                sizeMode: layer.pntsSizeMode,
                minAttenuatedSize: layer.pntsMinAttenuatedSize,
                maxAttenuatedSize: layer.pntsMaxAttenuatedSize,
            });

        // refer material properties in the layer so when layers opacity and visibility is updated, the material is
        // automatically updated
        ReferLayerProperties(material, layer);

        // creation points with geometry and material
        const points = new THREE.Points(result.point.geometry, material);

        if (result.point.offset) {
            points.position.copy(result.point.offset);
        }

        return { object3d: points,
            batchTable: result.batchTable,
        };
    });
}