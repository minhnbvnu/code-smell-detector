async function setNetworkNodeFee(fee) {
                    await setDAOProtocolBootstrapSetting(RocketDAOProtocolSettingsNetwork, 'network.node.fee.minimum', fee, {from: owner});
                    await setDAOProtocolBootstrapSetting(RocketDAOProtocolSettingsNetwork, 'network.node.fee.target', fee, {from: owner});
                    await setDAOProtocolBootstrapSetting(RocketDAOProtocolSettingsNetwork, 'network.node.fee.maximum', fee, {from: owner});
                }