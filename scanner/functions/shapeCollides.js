function shapeCollides(a, b) {

    a = makeBoundingBox(a);
    b = makeBoundingBox(b);

    // quick shortcut
    if(Math.abs(a.x - b.x) > a.w + b.w)
       return false;

    if(Math.abs(a.y - b.y) > a.h + b.h)
       return false;

    if(a.type == "rectangle") {
        if(b.type == "rectangle") {
            return rectangleCollides(a, b);
        }
        if(b.type == "circle") {
            return rectangleCircleCollides(a, b);
        }
    }

    if(a.type == "circle") {
        if(b.type == "circle") {
            return circleCollides(a, b)
        }
        if(b.type == "rectangle") {
            return rectangleCircleCollides(b, a);
        }
    }
}