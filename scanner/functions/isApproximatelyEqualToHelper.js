function isApproximatelyEqualToHelper(subject, other, epsilon) {
    if (subject === null) {
        return other === null;
    } else if (subject === undefined) {
        return other === undefined;
    } else if (subject.isApproximatelyEqualTo !== undefined) {
        return subject.isApproximatelyEqualTo(other, epsilon);
    } else if (typeof subject === 'number') {
        return subject === other ||
            (isNaN(subject) && isNaN(other)) ||
            (typeof other === 'number' && Math.abs(subject - other) < epsilon);
    } else if (isArrayIsh(subject)) {
        if (!isArrayIsh(other) || other.length !== subject.length) {
            return false;
        }
        for (let i = 0; i < subject.length; i++) {
            if (!isApproximatelyEqualToHelper(subject[i], other[i], epsilon)) {
                return false;
            }
        }
        return true;
    } else if (subject instanceof Object && subject.toString() === "[object Object]") {
        return isApproximatelyEqualToHelperDestructured(subject, other, epsilon);
    } else if (subject === other) {
        return true;
    } else {
        fail('Expected ' + describe(subject) + ' to have an isApproximatelyEqualTo method');
        return false;
    }
}