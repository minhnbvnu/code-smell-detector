function process(poly) {
        // Construct input for earcut
        const coords = [];
        const holes = [];
        poly.points.forEach(({ x, y }) => coords.push(x, y));
        poly.children.forEach((child) => {
            // Children's children are new, separate shapes
            child.children.forEach(process);

            holes.push(coords.length / 2);
            child.points.forEach(({ x, y }) => coords.push(x, y));
        });

        // Add vertex data
        vertexData.set(coords, vertexCount * 2);

        // Add index data
        earcut(coords, holes).forEach(i => indices.push(i + vertexCount));
        vertexCount += coords.length / 2;
    }