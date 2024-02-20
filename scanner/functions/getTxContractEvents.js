function getTxContractEvents(txReceipt, contractAddress, eventName, eventParams) {
    return txReceipt.receipt.rawLogs
        .filter(log => (log.address.toLowerCase() == contractAddress.toLowerCase()))
        .filter(log => (log.topics[0] == web3.utils.soliditySha3(eventName + '(' + eventParams.map(param => param.type).join(',') + ')')))
        .map(log => web3.eth.abi.decodeLog(eventParams.map(param => {
            let decodeParam = Object.assign({}, param);
            if (decodeParam.indexed && (decodeParam.type == 'string' || decodeParam.type == 'bytes')) decodeParam.type = 'bytes32'; // Issues decoding indexed string and bytes parameters
            return decodeParam;
        }), log.data, log.topics.slice(1)));
}