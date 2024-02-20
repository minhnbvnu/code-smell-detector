async function setDaoNodeTrustedBootstrapUpgrade(_type, _name, _abi, _contractAddress, txOptions) {
    // Load contracts
    const [
        rocketStorage,
        rocketDAONodeTrusted,
    ] = await Promise.all([
        RocketStorage.deployed(),
        RocketDAONodeTrusted.deployed(),
    ]);

    // Add test method to ABI
    let compressedAbi = ''
    if (Array.isArray(_abi)){
        let testAbi = _abi.slice();
        testAbi.push({
            "constant": true,
            "inputs": [],
            "name": "testMethod",
            "outputs": [{
                "name": "",
                "type": "uint8"
            }],
            "payable": false,
            "stateMutability": "view",
            "type": "function",
        });
        compressedAbi = compressABI(testAbi);
    }

    // Get contract data
    function getContractData() {
        return Promise.all([
            rocketStorage.getAddress.call(web3.utils.soliditySha3('contract.address', _name)),
            rocketStorage.getString.call(web3.utils.soliditySha3('contract.abi', _name)),
        ]).then(
            ([address, abi]) =>
            ({address, abi})
        );
    }
    function getContractAddressData(_contractAddress) {
        return Promise.all([
            rocketStorage.getBool.call(web3.utils.soliditySha3('contract.exists', _contractAddress)),
            rocketStorage.getString.call(web3.utils.soliditySha3('contract.name', _contractAddress)),
        ]).then(
            ([exists, name]) =>
            ({exists, name})
        );
    }

    // Get initial contract data
    let contract1 = await getContractData();

    // Upgrade contract
    await rocketDAONodeTrusted.bootstrapUpgrade(_type, _name, compressedAbi, _contractAddress, txOptions);

    // Get updated contract data
    let contract2 = await getContractData();
    let [oldContractData, newContractData] = await Promise.all([
        getContractAddressData(contract1.address),
        getContractAddressData(contract2.address),
    ]);

    // Initialise new contract from stored data
    let newContract = new web3.eth.Contract(decompressABI(contract2.abi), contract2.address);

    // Check different assertions based on upgrade type
    if(_type === 'upgradeContract') {
        // Check contract details
        assert.strictEqual(contract2.address, _contractAddress, 'Contract address was not successfully upgraded');
        assert.notEqual(newContract.methods.testMethod, undefined, 'Contract ABI was not successfully upgraded');
        assert.isFalse(oldContractData.exists, 'Old contract address exists flag was not unset');
        assert.strictEqual(oldContractData.name, '', 'Old contract address name was not unset');
        assert.isTrue(newContractData.exists, 'New contract exists flag was not set');
        assert.notEqual(newContractData.name, '', 'New contract name was not set');
    }
    if(_type === 'addContract') {
        // Check contract details
        assert.strictEqual(contract2.address, _contractAddress, 'Contract address was not set');
        assert.notEqual(newContract.methods.testMethod, undefined, 'Contract ABI was not set');
        assert.isTrue(newContractData.exists, 'New contract exists flag was not set');
        assert.notEqual(newContractData.name, '', 'New contract name was not set');
    }
    if(_type === 'upgradeABI' || _type === 'addABI') {
        // Check ABI details
        let contractAbi = await rocketStorage.getString.call(web3.utils.soliditySha3('contract.abi', _name));
        let contract = new web3.eth.Contract(decompressABI(contractAbi), '0x0000000000000000000000000000000000000000');
        assert.notEqual(contract.methods.testMethod, undefined, 'Contract ABI was not set');
    }
}