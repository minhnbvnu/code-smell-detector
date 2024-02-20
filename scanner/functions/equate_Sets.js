function equate_Sets(subject, other) {
    if (subject.size !== other.size) {
        return false;
    }
    for (let k of subject) {
        if (!other.has(k)) {
            return false;
        }
    }
    return true;
}