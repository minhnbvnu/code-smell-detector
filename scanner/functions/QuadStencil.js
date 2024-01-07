constructor(gl, vertices, debug) {
        this.gl = gl;
        this.quadVertices = vertices || quadVertices;
        this.attributes = ['a_position', 3, getType(vertices)];
        this.debug = debug;
    }