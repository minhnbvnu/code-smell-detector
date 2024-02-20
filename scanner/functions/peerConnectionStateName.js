function peerConnectionStateName(connectionState) {
    switch (connectionState) {
        case Nimiq.PeerConnectionState.NEW:
            return chalk.yellow('New');
        case Nimiq.PeerConnectionState.ESTABLISHED:
            return chalk.green('Established');
        case Nimiq.PeerConnectionState.CONNECTING:
            return chalk.yellow('Connecting');
        case Nimiq.PeerConnectionState.CONNECTED:
            return chalk.yellow('Connected');
        case Nimiq.PeerConnectionState.NEGOTIATING:
            return chalk.yellow('Negotiating');
    }
    return 'Unknown';
}