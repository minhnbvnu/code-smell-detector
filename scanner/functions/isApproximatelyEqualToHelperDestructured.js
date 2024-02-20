function isApproximatelyEqualToHelperDestructured(subject, other, epsilon) {
    let keys = [];
    for (let subjectKey in subject) {
        if (subject.hasOwnProperty(subjectKey)) {
            keys.push(subjectKey);
        }
    }
    for (let otherKey in other) {
        if (other.hasOwnProperty(otherKey) && !subject.hasOwnProperty(otherKey)) {
            return false;
        }
    }

    return keys.every(key => other.hasOwnProperty(key) &&
        isApproximatelyEqualToHelper(subject[key], other[key], epsilon));
}