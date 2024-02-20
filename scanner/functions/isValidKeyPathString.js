function isValidKeyPathString (keyPathString) {
    return typeof keyPathString === 'string' &&
        (keyPathString === '' || isIdentifier(keyPathString) || keyPathString.split('.').every((pathComponent) => {
            return isIdentifier(pathComponent);
        }));
}