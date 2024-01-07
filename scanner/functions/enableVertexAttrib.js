function enableVertexAttrib(gl, program, attributes) {
    if (Array.isArray(attributes[0])) {
        const FSIZE = Float32Array.BYTES_PER_ELEMENT;
        let STRIDE = 0;
        for (let i = 0; i < attributes.length; i++) {
            STRIDE += (attributes[i][1] || 0);
        }
        let offset = 0;
        for (let i = 0; i < attributes.length; i++) {
            const attr = gl.getAttribLocation(program, attributes[i][0]);
            if (attr < 0) {
                throw new Error('Failed to get the storage location of ' + attributes[i][0]);
            }
            gl.vertexAttribPointer(attr, attributes[i][1], gl[attributes[i][2] || 'FLOAT'], false, FSIZE * STRIDE, FSIZE * offset);
            offset += (attributes[i][1] || 0);
            gl.enableVertexAttribArray(attr);
        }
    } else {
        const attr = gl.getAttribLocation(program, attributes[0]);
        gl.vertexAttribPointer(attr, attributes[1], gl[attributes[2] || 'FLOAT'], false, 0, 0);
        gl.enableVertexAttribArray(attr);
    }
}