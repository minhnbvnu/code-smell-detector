async function resetNetworkDelegateContract() {
            // Upgrade the delegate contract
            await setDaoNodeTrustedBootstrapUpgrade('upgradeContract', 'rocketMinipoolDelegate', [], oldDelegateAddress, {
                from: owner,
            });
        }