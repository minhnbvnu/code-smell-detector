function derefSubgridRef(ref) {
    var Constructor;
    switch (typeof ref) {
        case 'string':
            Constructor = dataModels.get(ref);
            break;
        case 'function':
            Constructor = ref;
            break;
        default:
            throw new this.HypergridError('Expected subgrid ref to be registered name or constructor, but found ' + typeof ref + '.');
    }
    return Constructor;
}