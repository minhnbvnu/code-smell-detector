function serializeViewAs(viewAs) {
    switch (viewAs) {
        case dataStoreConstants.VIEW_AS_HEX_ASCII:
            return 'hex';
        case dataStoreConstants.VIEW_AS_DOTTED_ASCII:
            return 'dottedAscii';
        default:
            return 'printableAscii';
    }
}