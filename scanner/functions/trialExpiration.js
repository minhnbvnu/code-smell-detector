function trialExpiration(instance) {
    return async function () {
        let ServiceInstance = require("../../models/service-instance");
        let currentInstance = (await ServiceInstance.find({id: instance.id}))[0];
        let trialEnd = getTrialEnd(currentInstance);
        if (trialEnd <= new Date()) {
            let Fund = require('../../models/fund');
            let fund = await Fund.findOne("user_id", currentInstance.get("user_id"));

            if (!fund.data) {
                console.log("TRIAL EXPIRED AND NO FUNDS, UNSUBSCRIBE!");
                instance.unsubscribe()
            } else {
                console.log("funds have been added, no unsubscribe needed");
            }
        } else {
            console.log("trial no longer expiring");
        }
    }
}