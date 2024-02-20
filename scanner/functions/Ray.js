function Ray(options){
    options = options || {};

    /**
     * Ray start point.
     * @property {array} from
     */
    this.from = options.from ? vec2.fromValues(options.from[0], options.from[1]) : vec2.create();

    /**
     * Ray end point
     * @property {array} to
     */
    this.to = options.to ? vec2.fromValues(options.to[0], options.to[1]) : vec2.create();

    /**
     * Set to true if you want the Ray to take .collisionResponse flags into account on bodies and shapes.
     * @property {Boolean} checkCollisionResponse
     */
    this.checkCollisionResponse = options.checkCollisionResponse !== undefined ? options.checkCollisionResponse : true;

    /**
     * If set to true, the ray skips any hits with normal.dot(rayDirection) < 0.
     * @property {Boolean} skipBackfaces
     */
    this.skipBackfaces = !!options.skipBackfaces;

    /**
     * @property {number} collisionMask
     * @default -1
     */
    this.collisionMask = options.collisionMask !== undefined ? options.collisionMask : -1;

    /**
     * @property {number} collisionGroup
     * @default -1
     */
    this.collisionGroup = options.collisionGroup !== undefined ? options.collisionGroup : -1;

    /**
     * The intersection mode. Should be {{#crossLink "Ray/ANY:property"}}Ray.ANY{{/crossLink}}, {{#crossLink "Ray/ALL:property"}}Ray.ALL{{/crossLink}} or {{#crossLink "Ray/CLOSEST:property"}}Ray.CLOSEST{{/crossLink}}.
     * @property {number} mode
     */
    this.mode = options.mode !== undefined ? options.mode : Ray.ANY;

    /**
     * Current, user-provided result callback. Will be used if mode is Ray.ALL.
     * @property {Function} callback
     */
    this.callback = options.callback || function(result){};

    /**
     * @readOnly
     * @property {array} direction
     */
    this.direction = vec2.create();

    /**
     * Length of the ray
     * @readOnly
     * @property {number} length
     */
    this.length = 1;

    this.update();
}