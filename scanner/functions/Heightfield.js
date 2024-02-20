function Heightfield(options){
    if(Array.isArray(arguments[0])){
        options = {
            heights: arguments[0]
        };

        if(typeof(arguments[1]) === 'object'){
            for(var key in arguments[1]){
                options[key] = arguments[1][key];
            }
        }

        console.warn('The Heightfield constructor signature has changed. Please use the following format: new Heightfield({ heights: [...], ... })');
    }
    options = options || {};

    /**
     * An array of numbers, or height values, that are spread out along the x axis.
     * @property {array} heights
     */
    this.heights = options.heights ? options.heights.slice(0) : [];

    /**
     * Max value of the heights
     * @property {number} maxValue
     */
    this.maxValue = options.maxValue || null;

    /**
     * Max value of the heights
     * @property {number} minValue
     */
    this.minValue = options.minValue || null;

    /**
     * The width of each element
     * @property {number} elementWidth
     */
    this.elementWidth = options.elementWidth || 0.1;

    if(options.maxValue === undefined || options.minValue === undefined){
        this.updateMaxMinValues();
    }

    options.type = Shape.HEIGHTFIELD;
    Shape.call(this, options);
}