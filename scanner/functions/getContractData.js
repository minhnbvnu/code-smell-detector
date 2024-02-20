function getContractData() {
        return Promise.all([
            rocketStorage.getAddress.call(web3.utils.soliditySha3('contract.address', _name)),
            rocketStorage.getString.call(web3.utils.soliditySha3('contract.abi', _name)),
        ]).then(
            ([address, abi]) =>
            ({address, abi})
        );
    }