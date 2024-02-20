function isRestrictedPR(restriction, prSource) {
    switch (restriction) {
        case 'all':
        case 'all-admin':
            return true;
        case 'branch':
        case 'branch-admin':
            return prSource === 'branch';
        case 'fork':
        case 'fork-admin':
            return prSource === 'fork';
        case 'none':
        case 'none-admin':
        default:
            return false;
    }
}