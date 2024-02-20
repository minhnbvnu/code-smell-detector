function displayPeerState(peerState, desc) {
    if (!peerState) {
        console.log(chalk`Peer {bold ${desc}} not found.`);
        return;
    }
    console.log(chalk`Peer {bold ${peerState.id}}:`);
    console.log(`Address         | ${peerState.address}`);
    console.log(`Failed attempts | ${peerState.failedAttempts}`);
    console.log(`A-State         | ${peerAddressStateName(peerState.addressState)}`);
    if (peerState.connectionState) {
        console.log(`C-State         | ${peerConnectionStateName(peerState.connectionState)}`);
        console.log(`Head hash       | ${peerState.headHash}`);
        console.log(`Time offset     | ${peerState.timeOffset}`);
        console.log(`Latency         | ${peerState.latency}`);
        console.log(`Traffic         | ${bytesFormat(peerState.rx)} RX / ${bytesFormat(peerState.tx)} TX`);
    } else {
        console.log('C-State         | Disconnected');
    }
}