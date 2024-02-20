function columnOnlyError() {
    throw new HypergridError('Attempt to set/get column-only property on a non-column properties object.');
}