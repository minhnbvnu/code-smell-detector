function getDeployedAddress(chain, proxyChain, contract, proxyContract) {
    let deployedAddress
    try {
        if (chain === proxyChain) {
            deployedAddress = getDeploymentAddresses(chain)[proxyContract].toLowerCase()
        } else {
            deployedAddress = getDeploymentAddresses(chain)[contract].toLowerCase()
        }
    } catch {
        deployedAddress = undefined
    }
    return deployedAddress
}