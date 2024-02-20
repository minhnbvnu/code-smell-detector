function tryEquate_custom(subject, other) {
    if (!isAtomic(subject) && subject.constructor.prototype.hasOwnProperty("isEqualTo")) {
        return subject.isEqualTo(other);
    }
    if (!isAtomic(other) && other.constructor.prototype.hasOwnProperty("isEqualTo")) {
        return other.isEqualTo(subject);
    }
    return undefined;
}