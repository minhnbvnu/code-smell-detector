function equate_Objects(subject, other) {
    let keys = objectKeys(subject);
    if (!equate_Sets(keys, objectKeys(other))) {
        return false;
    }

    for (let k of keys) {
        if (k === Symbol.iterator) {
            continue;
        }
        if (!equate(subject[k], other[k])) {
            return false;
        }
    }

    let hasSubjectIter = subject[Symbol.iterator] !== undefined;
    let hasOtherIter = other[Symbol.iterator] !== undefined;
    if (hasSubjectIter !== hasOtherIter) {
        return false;
    }
    if (hasSubjectIter && hasOtherIter) {
        if (!equate_Iterables(/** @type {!Iterable} */ subject, /** @type {!Iterable} */ other)) {
            return false;
        }
    }

    return true;
}