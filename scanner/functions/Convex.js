function Convex(options){
    if(Array.isArray(arguments[0])){
        options = {
            vertices: arguments[0],
            axes: arguments[1]
        };
        console.warn('The Convex constructor signature has changed. Please use the following format: new Convex({ vertices: [...], ... })');
    }
    options = options || {};

    /**
     * Vertices defined in the local frame.
     * @property vertices
     * @type {Array}
     */
    this.vertices = [];

    // Copy the verts
    var vertices = options.vertices !== undefined ? options.vertices : [];
    for(var i=0; i < vertices.length; i++){
        var v = vec2.create();
        vec2.copy(v, vertices[i]);
        this.vertices.push(v);
    }

    /**
     * Axes defined in the local frame.
     * @property axes
     * @type {Array}
     */
    this.axes = [];

    if(options.axes){

        // Copy the axes
        for(var i=0; i < options.axes.length; i++){
            var axis = vec2.create();
            vec2.copy(axis, options.axes[i]);
            this.axes.push(axis);
        }

    } else {

        // Construct axes from the vertex data
        for(var i = 0; i < this.vertices.length; i++){
            // Get the world edge
            var worldPoint0 = this.vertices[i];
            var worldPoint1 = this.vertices[(i+1) % this.vertices.length];

            var normal = vec2.create();
            vec2.sub(normal, worldPoint1, worldPoint0);

            // Get normal - just rotate 90 degrees since vertices are given in CCW
            vec2.rotate90cw(normal, normal);
            vec2.normalize(normal, normal);

            this.axes.push(normal);
        }

    }

    /**
     * The center of mass of the Convex
     * @property centerOfMass
     * @type {Array}
     */
    this.centerOfMass = vec2.fromValues(0,0);

    /**
     * Triangulated version of this convex. The structure is Array of 3-Arrays, and each subarray contains 3 integers, referencing the vertices.
     * @property triangles
     * @type {Array}
     */
    this.triangles = [];

    if(this.vertices.length){
        this.updateTriangles();
        this.updateCenterOfMass();
    }

    /**
     * The bounding radius of the convex
     * @property boundingRadius
     * @type {Number}
     */
    this.boundingRadius = 0;

    options.type = Shape.CONVEX;
    Shape.call(this, options);

    this.updateBoundingRadius();
    this.updateArea();
    if(this.area < 0){
        throw new Error("Convex vertices must be given in conter-clockwise winding.");
    }
}