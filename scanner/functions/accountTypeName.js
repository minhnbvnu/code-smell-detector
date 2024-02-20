function accountTypeName(type) {
    switch (type) {
        case Nimiq.Account.Type.BASIC:
            return 'Basic Account';
        case Nimiq.Account.Type.VESTING:
            return 'Vesting Contract';
        case Nimiq.Account.Type.HTLC:
            return 'Hashed Time-Locked Contract';
    }
    return 'Unknown';
}