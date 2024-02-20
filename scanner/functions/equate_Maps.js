function equate_Maps(subject, other) {
    if (subject.size !== other.size) {
        return false;
    }
    for (let [k, v] of subject) {
        //noinspection JSUnusedAssignment
        if (!other.has(k)) {
            return false;
        }
        //noinspection JSUnusedAssignment
        let otherV = other.get(k);
        //noinspection JSUnusedAssignment
        if (!equate(v, otherV)) {
            return false;
        }
    }
    return true;
}