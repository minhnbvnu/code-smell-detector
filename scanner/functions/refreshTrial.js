function* refreshTrial(action) {
    let instance = action.event_data;
    let trialEnd = getTrialEnd(instance);
    if (trialEnd) {
        let job = schedule.scheduleJob(trialEnd, trialExpiration(instance));
    }


}