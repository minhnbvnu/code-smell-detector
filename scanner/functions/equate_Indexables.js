function equate_Indexables(subject, other) {
    if (subject.length !== other.length) {
        return false;
    }
    for (let i = 0; i < subject.length; i++) {
        if (!equate(subject[i], other[i])) {
            return false;
        }
    }
    return true;
}