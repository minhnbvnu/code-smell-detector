function generateAttackUrl(targetHostIPAddress, targetPort, forceDnsRebindingStrategyName) {
        return hosturl
            .replace("%1", configuration.getAttackHostIPAddress())
            .replace("%2", targetHostIPAddress) // replace(/-/g, '--'))
            .replace("%3", Math.floor(Math.random() * 2 ** 32))
            .replace("%4", forceDnsRebindingStrategyName === null ?
                configuration.getRebindingStrategy() : forceDnsRebindingStrategyName)
            .replace("%5", configuration.getAttackHostDomain())
            .replace("%6", targetPort)
            .replace("%7", 'soopayload.html' + '?rnd=' + Math.random())
    }