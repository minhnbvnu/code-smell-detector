function identical(obj1, obj2) {
    if (obj1 === obj2 || (isNaN(obj1) && isNaN(obj2))) {
        return obj1 !== 0 || isNegZero(obj1) === isNegZero(obj2);
    }

    return false;
}