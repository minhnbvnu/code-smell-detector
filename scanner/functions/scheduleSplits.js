function* scheduleSplits() {
    let ServiceInstance = require("../../models/service-instance");
    let Fund = require('../../models/fund');
    let instances = yield call(ServiceInstance.find, {"type": "split", "not": {"subscription_id": null}});
    for (let instance of instances) {
        yield call(scheduleSplitsForInstance, instance);
    }
}