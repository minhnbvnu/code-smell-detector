function Box(options){
    if(typeof(arguments[0]) === 'number' && typeof(arguments[1]) === 'number'){
        options = {
            width: arguments[0],
            height: arguments[1]
        };
        console.warn('The Rectangle has been renamed to Box and its constructor signature has changed. Please use the following format: new Box({ width: 1, height: 1, ... })');
    }
    options = options || {};

    /**
     * Total width of the box
     * @property width
     * @type {Number}
     */
    var width = this.width = options.width || 1;

    /**
     * Total height of the box
     * @property height
     * @type {Number}
     */
    var height = this.height = options.height || 1;

    var verts = [
        vec2.fromValues(-width/2, -height/2),
        vec2.fromValues( width/2, -height/2),
        vec2.fromValues( width/2,  height/2),
        vec2.fromValues(-width/2,  height/2)
    ];
    var axes = [
        vec2.fromValues(1, 0),
        vec2.fromValues(0, 1)
    ];

    options.vertices = verts;
    options.axes = axes;
    options.type = Shape.BOX;
    Convex.call(this, options);
}