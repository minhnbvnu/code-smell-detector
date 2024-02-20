function nodeify(object, nodeback) {
    return Q(object).nodeify(nodeback);
}