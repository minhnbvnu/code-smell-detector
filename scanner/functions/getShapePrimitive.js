function getShapePrimitive(device, type) {

    // find in cache
    let primData = null;
    for (let i = 0; i < shapePrimitives.length; i++) {
        if (shapePrimitives[i].type === type && shapePrimitives[i].device === device) {
            primData = shapePrimitives[i].primData;
        }
    }

    // not in cache, create new
    if (!primData) {

        let mesh, area;
        switch (type) {

            case 'box':
                mesh = createBox(device);
                area = { x: 2, y: 2, z: 2, uv: (2.0 / 3) };
                break;

            case 'capsule':
                mesh = createCapsule(device, { radius: 0.5, height: 2 });
                area = { x: (Math.PI * 2), y: Math.PI, z: (Math.PI * 2), uv: (1.0 / 3 + ((1.0 / 3) / 3) * 2) };
                break;

            case 'cone':
                mesh = createCone(device, { baseRadius: 0.5, peakRadius: 0, height: 1 });
                area = { x: 2.54, y: 2.54, z: 2.54, uv: (1.0 / 3 + (1.0 / 3) / 3) };
                break;

            case 'cylinder':
                mesh = createCylinder(device, { radius: 0.5, height: 1 });
                area = { x: Math.PI, y: (0.79 * 2), z: Math.PI, uv: (1.0 / 3 + ((1.0 / 3) / 3) * 2) };
                break;

            case 'plane':
                mesh = createPlane(device, { halfExtents: new Vec2(0.5, 0.5), widthSegments: 1, lengthSegments: 1 });
                area = { x: 0, y: 1, z: 0, uv: 1 };
                break;

            case 'sphere':
                mesh = createSphere(device, { radius: 0.5 });
                area = { x: Math.PI, y: Math.PI, z: Math.PI, uv: 1 };
                break;

            case 'torus':
                mesh = createTorus(device, { tubeRadius: 0.2, ringRadius: 0.3 });
                area = { x: Math.PI * 0.5 * 0.5 - Math.PI * 0.1 * 0.1, y: 0.4, z: 0.4, uv: 1 };
                break;

            default:
                throw new Error('Invalid primitive type: ' + type);
        }

        // inc reference to keep primitive alive
        mesh.incRefCount();

        primData = { mesh: mesh, area: area };

        // add to cache
        shapePrimitives.push({
            type: type,
            device: device,
            primData: primData
        });
    }

    return primData;
}