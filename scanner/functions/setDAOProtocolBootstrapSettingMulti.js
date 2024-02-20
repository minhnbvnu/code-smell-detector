async function setDAOProtocolBootstrapSettingMulti(_settingContractInstances, _settingPaths, _values, txOptions) {
  // Helper function
  String.prototype.lowerCaseFirstLetter = function() {
    return this.charAt(0).toLowerCase() + this.slice(1);
  }

  // Load contracts
  const rocketDAOProtocol = await RocketDAOProtocol.deployed();


  const contractNames = [];
  const values = [];
  const types = [];

  for (let i = 0; i < _settingContractInstances.length; i++) {
    const value = _values[i];
    contractNames.push(_settingContractInstances[i]._json.contractName.lowerCaseFirstLetter());
    if(Web3.utils.isAddress(value)) {
      values.push(web3.eth.abi.encodeParameter('address', value));
      types.push(2);
    }else{
      if(typeof(value) == 'number' || typeof(value) == 'string' || typeof(value) == 'object') {
        values.push(web3.eth.abi.encodeParameter('uint256', value));
        types.push(0);
      } else if(typeof(value) == 'boolean') {
        values.push(web3.eth.abi.encodeParameter('bool', value));
        types.push(1);
      } else {
        throw new Error('Invalid value supplied');
      }
    }
  }

  // console.log(contractNames);
  // console.log(_settingPaths);
  // console.log(types);
  // console.log(values);

  // Set as a bootstrapped setting. detect type first, can be a number, string or bn object
  await rocketDAOProtocol.bootstrapSettingMulti(contractNames, _settingPaths, types, values, txOptions);

  // Get data about the tx
  async function getTxData() {
    const instances = await Promise.all(_settingContractInstances.map(instance => instance.deployed()));
    return Promise.all(instances.map((rocketDAOProtocolSettingsContract, index) => {
      switch (types[index]) {
        case 0:
          return rocketDAOProtocolSettingsContract.getSettingUint.call(_settingPaths[index]);
        case 1:
          return rocketDAOProtocolSettingsContract.getSettingBool.call(_settingPaths[index]);
        case 2:
          return rocketDAOProtocolSettingsContract.getSettingAddress.call(_settingPaths[index]);
      }
    }));
  }

  // Capture data
  let data = await getTxData();

  // Check it was updated
  for (let i = 0; i < _values.length; i++) {
    const value = _values[i];
    switch (types[i]) {
      case 0:
        assertBN.equal(data[i], value, 'DAO protocol uint256 setting not updated in bootstrap mode');
        break;
      case 1:
        assert.strictEqual(data[i], value, 'DAO protocol boolean setting not updated in bootstrap mode');
        break;
      case 2:
        assert.strictEqual(data[i], value, 'DAO protocol address setting not updated in bootstrap mode');
        break;
    }
  }
}