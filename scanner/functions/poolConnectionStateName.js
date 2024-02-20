function poolConnectionStateName(connectionState) {
    switch (connectionState) {
        case Nimiq.BasePoolMiner.ConnectionState.CONNECTED:
            return 'Connected';
        case Nimiq.BasePoolMiner.ConnectionState.CONNECTING:
            return 'Connecting';
        case Nimiq.BasePoolMiner.ConnectionState.CLOSED:
        default:
            return 'Disconnected';
    }
}