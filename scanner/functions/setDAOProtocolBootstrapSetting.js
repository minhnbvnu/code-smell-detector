async function setDAOProtocolBootstrapSetting(_settingContractInstance, _settingPath, _value, txOptions) {

    // Helper function
    String.prototype.lowerCaseFirstLetter = function() {
        return this.charAt(0).toLowerCase() + this.slice(1);
    }

    // Load contracts
    const rocketDAOProtocol = await RocketDAOProtocol.deployed();
    const rocketDAOProtocolSettingsContract = await _settingContractInstance.deployed();

    // Get data about the tx
    function getTxData() {
        return Promise.all([
            rocketDAOProtocolSettingsContract.getSettingUint.call(_settingPath),
            rocketDAOProtocolSettingsContract.getSettingBool.call(_settingPath),
            rocketDAOProtocolSettingsContract.getSettingAddress.call(_settingPath)
        ]).then(
            ([settingUintValue, settingBoolValue, settingAddressValue]) =>
            ({settingUintValue, settingBoolValue, settingAddressValue})
        );
    }

    // Capture data
    let ds1 = await getTxData();

    // Set as a bootstrapped setting. detect type first, can be a number, string or bn object
    if(Web3.utils.isAddress(_value)) {
        await rocketDAOProtocol.bootstrapSettingAddress(_settingContractInstance._json.contractName.lowerCaseFirstLetter(), _settingPath, _value, txOptions);
    }else{
        if(typeof(_value) == 'number' || typeof(_value) == 'string' || typeof(_value) == 'object') await rocketDAOProtocol.bootstrapSettingUint(_settingContractInstance._json.contractName.lowerCaseFirstLetter(), _settingPath, _value, txOptions);
        if(typeof(_value) == 'boolean') await rocketDAOProtocol.bootstrapSettingBool(_settingContractInstance._json.contractName.lowerCaseFirstLetter(), _settingPath, _value, txOptions);
    }

    // Capture data
    let ds2 = await getTxData();

    // Check it was updated
    if (Web3.utils.isAddress(_value)) {
        assert.strictEqual(ds2.settingAddressValue, _value, 'DAO protocol address setting not updated in bootstrap mode');
    } else {
        if(typeof(_value) == 'number' || typeof(_value) == 'string') {
            assertBN.equal(ds2.settingUintValue, _value, 'DAO protocol uint256 setting not updated in bootstrap mode');
        }
        if(typeof(_value) == 'boolean') {
            assert.strictEqual(ds2.settingBoolValue, _value, 'DAO protocol boolean setting not updated in bootstrap mode');
        }
    }
}