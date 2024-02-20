function AABB(options){

    /**
     * The lower bound of the bounding box.
     * @property lowerBound
     * @type {Array}
     */
    this.lowerBound = vec2.create();
    if(options && options.lowerBound){
        vec2.copy(this.lowerBound, options.lowerBound);
    }

    /**
     * The upper bound of the bounding box.
     * @property upperBound
     * @type {Array}
     */
    this.upperBound = vec2.create();
    if(options && options.upperBound){
        vec2.copy(this.upperBound, options.upperBound);
    }
}