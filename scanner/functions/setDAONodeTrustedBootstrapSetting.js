async function setDAONodeTrustedBootstrapSetting(_settingContractInstance, _settingPath, _value, txOptions) {
    // Helper function
    String.prototype.lowerCaseFirstLetter = function() {
        return this.charAt(0).toLowerCase() + this.slice(1);
    }

    // Load contracts
    const rocketDAONodeTrusted = await RocketDAONodeTrusted.deployed();
    const rocketDAONodeTrustedSettingsContract = await _settingContractInstance.deployed();

    // Get data about the tx
    function getTxData() {
        return Promise.all([
            rocketDAONodeTrustedSettingsContract.getSettingUint.call(_settingPath),
            rocketDAONodeTrustedSettingsContract.getSettingBool.call(_settingPath)
        ]).then(
            ([settingUintValue, settingBoolValue]) =>
            ({settingUintValue, settingBoolValue})
        );
    }

    // Set as a bootstrapped setting. detect type first, can be a number, string or bn object
    if(typeof(_value) == 'number' || typeof(_value) == 'string' || typeof(_value) == 'object') {
        await rocketDAONodeTrusted.bootstrapSettingUint(_settingContractInstance._json.contractName.lowerCaseFirstLetter(), _settingPath, _value, txOptions)
    }
    if(typeof(_value) == 'boolean') {
        await rocketDAONodeTrusted.bootstrapSettingBool(_settingContractInstance._json.contractName.lowerCaseFirstLetter(), _settingPath, _value, txOptions);
    }
    
    // Capture data
    let ds2 = await getTxData();

    // Check it was updated
    if(typeof(_value) == 'number' || typeof(_value) == 'string') {
        await assertBN.equal(ds2.settingUintValue, _value, 'DAO node trusted uint256 setting not updated in bootstrap mode');
    }
    if(typeof(_value) == 'boolean') {
        await assert.strictEqual(ds2.settingBoolValue, _value, 'DAO node trusted boolean setting not updated in bootstrap mode');
    }
}