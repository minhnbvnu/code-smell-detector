function isObjectSpreadAvailable() {
    return tryThis('const a = {...{b: 33}}', 'object-spread');
}