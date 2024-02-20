function equate(subject, other) {
    if (subject === other || (isExactlyNaN(subject) && isExactlyNaN(other))) {
        return true;
    }

    // Custom equality.
    let customEquality = tryEquate_custom(subject, other);
    if (customEquality !== undefined) {
        return customEquality;
    }
    if (isAtomic(subject) || isAtomic(other) || !eqType(subject, other)) {
        return false;
    }

    // Collection equality.
    if (subject instanceof Map) {
        return equate_Maps(subject, other);
    }
    if (subject instanceof Set) {
        return equate_Sets(subject, other);
    }
    if (isIndexable(subject)) {
        return equate_Indexables(subject, other);
    }

    // Object equality.
    return equate_Objects(subject, other);
}