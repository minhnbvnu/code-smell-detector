async function checkInvariants() {
    const nodeAddresses = await getNodeAddresses();

    for (const nodeAddress of nodeAddresses) {
        const minipools = await getMinipoolsByNode(nodeAddress);
        await checkNodeInvariants(nodeAddress, minipools);
    }
}