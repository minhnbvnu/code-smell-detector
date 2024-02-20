function convertToSequenceDOMString (val) {
    // Per <https://heycam.github.io/webidl/#idl-sequence>, converting to a sequence works with iterables
    if (isIterable(val)) { // We don't want conversion to array to convert primitives
        // Per <https://heycam.github.io/webidl/#es-DOMString>, converting to a `DOMString` to be via `ToString`: https://tc39.github.io/ecma262/#sec-tostring
        return [...val].map((item) => {
            return ToString(item);
        });
    }
    return ToString(val);
}