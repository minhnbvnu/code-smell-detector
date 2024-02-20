function peerAddressStateName(peerState) {
    switch (peerState) {
        case Nimiq.PeerAddressState.NEW:
            return 'New';
        case Nimiq.PeerAddressState.ESTABLISHED:
            return chalk.green('Established');
        case Nimiq.PeerAddressState.TRIED:
            return chalk.yellow('Tried');
        case Nimiq.PeerAddressState.FAILED:
            return chalk.yellow('Failed');
        case Nimiq.PeerAddressState.BANNED:
            return chalk.red('Banned');
    }
    return 'Unknown';
}