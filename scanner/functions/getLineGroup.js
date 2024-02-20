function getLineGroup(line) {
            if (layer == undefined)
                newLayer(line);
            var speed = Math.round(line.e / 1000);
            var grouptype = (line.extruding ? 10000 : 0) + speed;
            var color = new THREE.Color(line.extruding ? 0xffffff : 0x0000ff);
            if (layer.type[grouptype] == undefined) {
                layer.type[grouptype] = {
                    type: grouptype,
                    feed: line.e,
                    extruding: line.extruding,
                    color: color,
                    segmentCount: 0,
                    material: new THREE.LineBasicMaterial({
                        opacity: line.extruding ? 0.5 : 0.4,
                        transparent: true,
                        linewidth: 1,
                        vertexColors: THREE.FaceColors
                    }),
                    geometry: new THREE.Geometry(),
                }
            }
            return layer.type[grouptype];
        }