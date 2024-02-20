function toName(type, path) {
    const baseName = path.join(".")
    return type === ReferenceTracker.CALL
        ? `${baseName}()`
        : type === ReferenceTracker.CONSTRUCT
            ? `new ${baseName}()`
            : baseName
}