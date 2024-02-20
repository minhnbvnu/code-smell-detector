function getContractAddressData(_contractAddress) {
        return Promise.all([
            rocketStorage.getBool.call(web3.utils.soliditySha3('contract.exists', _contractAddress)),
            rocketStorage.getString.call(web3.utils.soliditySha3('contract.name', _contractAddress)),
        ]).then(
            ([exists, name]) =>
            ({exists, name})
        );
    }