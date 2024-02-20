function isValidKeyPath (keyPath) {
    return isValidKeyPathString(keyPath) || (
        Array.isArray(keyPath) && Boolean(keyPath.length) &&
            // Convert array from sparse to dense http://www.2ality.com/2012/06/dense-arrays.html
            // See also https://heycam.github.io/webidl/#idl-DOMString
            [...keyPath].every((pathComponent) => {
                return isValidKeyPathString(pathComponent);
            })
    );
}