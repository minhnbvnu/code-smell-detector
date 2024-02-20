function instanceOf (obj, Clss) {
    return Clss[Symbol.hasInstance](obj);
}