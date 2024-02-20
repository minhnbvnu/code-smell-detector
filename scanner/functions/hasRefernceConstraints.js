function hasRefernceConstraints(pattern) {
    return some(pattern.constraints || [], function (c) {
        return c instanceof ReferenceConstraint;
    });
}