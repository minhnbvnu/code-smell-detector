function resolveCollisions() {
    // return each pair of collision
    var collisions = {};
    // the function accept any amount of array of elements
    if(arguments.length == 1)
        var elements = arguments[0];
    else
        var elements = Array.prototype.concat.apply([], arguments);
    // search collisions elements by elements
    // O(N/2 * N/2)
    for(var i=0; i<elements.length; i++) {
        var el = elements[i];
        for(var j=i+1; j<elements.length; j++) {
            if(el.collidesWith(elements[j])) {
                collisions[el] = elements[j];
                collisions[elements[j]] = el;
            }
        }
    }
    return collisions;
}