function* startTimerWhenSubscribed(action) {
    let instance = action.event_object
    let trialEnd = getTrialEnd(instance);
    if (trialEnd) {
        let job = schedule.scheduleJob(trialEnd, trialExpiration(instance));
    }
    if (instance.get("type") === "split") {
        return scheduleSplitsForInstance(instance);
    }
}