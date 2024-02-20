async function upgradeNetworkDelegateContract() {
          // Upgrade the delegate contract
          await setDaoNodeTrustedBootstrapUpgrade('upgradeContract', 'rocketMinipoolDelegate', [], newDelegateAddress, {
            from: owner,
          });

          // Check effective delegate is still the original
          const minipool = await RocketMinipoolBase.at(stakingMinipool.address);
          const effectiveDelegate = await minipool.getEffectiveDelegate.call()
          assert.notEqual(effectiveDelegate, newDelegateAddress, "Effective delegate was updated")
        }