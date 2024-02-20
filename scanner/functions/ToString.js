function ToString (o) { // Todo: See `es-abstract/es7`
    // `String()` will not throw with Symbols
    return '' + o; // eslint-disable-line no-implicit-coercion
}