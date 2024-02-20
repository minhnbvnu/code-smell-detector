function* scheduleTrials() {
    let ServiceInstance = require("../../models/service-instance");
    let Fund = require('../../models/fund');
    let instances = yield call(ServiceInstance.find, {"not": {"subscription_id": null}});
    for (let instance of instances) {
        let trialEnd = getTrialEnd(instance);
        if (trialEnd !== null) {
            let fund = (yield call(Fund.find, {"user_id": instance.get("user_id")}))[0];
            if (!fund) {
                if (trialEnd <= (new Date())) {
                    instance.unsubscribe();
                } else {
                    console.log("no funds, setting expiration timer!");
                    let job = schedule.scheduleJob(trialEnd, trialExpiration(instance));

                }
            }
        }

    }
}