function $verifyLegalMode(mode) {
    try {
        // The test itself can throw, so we wrap it in an exception handler.

        // The name is 'GeneratorFunction' here without a prefix because it is
        // referencing JavaScript's own GeneratorFunction, not ours.

        if (mode.$type !== 'mode') {
            throw 1;
        }
    } catch (e) {
        $error('Not a valid mode: ' + unparse(mode));
    }
}