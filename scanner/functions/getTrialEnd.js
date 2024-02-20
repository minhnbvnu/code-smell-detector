function getTrialEnd(instance) {
    let plan = instance.get("payment_plan");
    let trialEnd = instance.get("trial_end");
    if (trialEnd === null && plan && plan.trial_period_days > 0) {
        trialEnd = new Date(instance.get("subscribed_at") * 1000);
        trialEnd.setDate(trialEnd.getDate() + plan.trial_period_days);
    } else if (trialEnd !== null) {
        trialEnd = new Date(instance.get("trial_end") * 1000);
    } else {
        return null;
    }
    return trialEnd;
}