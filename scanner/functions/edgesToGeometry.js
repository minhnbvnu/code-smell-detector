function edgesToGeometry(edges, y = null) {
        const edgeArray = new Float32Array(edges.length * 6);
        let c = 0;
        for (let i = 0, l = edges.length; i < l; i++) {
            const line = edges[i];
            edgeArray[c++] = line[0];
            edgeArray[c++] = y === null ? line[1] : y;
            edgeArray[c++] = line[2];
            edgeArray[c++] = line[3];
            edgeArray[c++] = y === null ? line[4] : y;
            edgeArray[c++] = line[5];
        }
        const edgeGeom = new BufferGeometry();
        const edgeBuffer = new BufferAttribute(edgeArray, 3, true);
        edgeGeom.setAttribute('position', edgeBuffer);
        return edgeGeom;
    }