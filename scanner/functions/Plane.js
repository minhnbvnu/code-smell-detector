function Plane(options){
    options = options || {};
    options.type = Shape.PLANE;
    Shape.call(this, options);
}