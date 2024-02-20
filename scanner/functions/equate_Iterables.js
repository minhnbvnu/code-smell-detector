function equate_Iterables(subject, other) {
    let otherIter = other[Symbol.iterator]();
    for (let subjectItem of subject) {
        let otherItemDone = otherIter.next();
        if (otherItemDone.done || !equate(subjectItem, otherItemDone.value)) {
            return false;
        }
    }
    return otherIter.next().done;
}