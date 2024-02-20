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