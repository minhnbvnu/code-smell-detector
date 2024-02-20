function getPenalty() {
        return Promise.all([
            rocketMinipoolPenalty.getPenaltyRate.call(minipoolAddress),
            rocketStorage.getUint.call(penaltyKey)
        ]).then(
          ([penaltyRate, penaltyCount]) =>
          ({penaltyRate, penaltyCount})
        )
    }