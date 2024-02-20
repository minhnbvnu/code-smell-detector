function isOverlapsAllowedByFunc(overlapEventFootprints, overlapFunc, subjectEventInstance) {
    var i;
    for (i = 0; i < overlapEventFootprints.length; i++) {
        if (!overlapFunc(overlapEventFootprints[i].eventInstance.toLegacy(), subjectEventInstance ? subjectEventInstance.toLegacy() : null)) {
            return false;
        }
    }
    return true;
}