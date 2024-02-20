async function scheduleSplitsForInstance(instance) {
    let Charge = require("../../models/charge");
    let splits = instance.get("split_configuration") && instance.get("split_configuration").splits;
    if (instance.get("type") === "split" && splits) {
        let splitCharges = await Charge.find({
            service_instance_id: instance.get("id"),
            description: {"like": "SPLIT_%"}
        });
        //sort by charge_day and slice it by the number of already existing charges
        let splitsToSchedule = splits.sort(function (a, b) {
            return parseInt(a.charge_day) - parseInt(b.charge_day);
        }).slice(splitCharges.length); //todo: rework this, there are edge cases that can give problems here

        for (let i in splitsToSchedule) {

            let split = splitsToSchedule[i];
            let scheduledDate = new Date(instance.get("subscribed_at") * 1000);
            //set date to be the subscribed at date + the charge_day
            scheduledDate.setDate(scheduledDate.getDate() + parseInt(split.charge_day));
            let splitNumber = (splitCharges.length + parseInt(i) + 1);
            let description = `SPLIT_${splitNumber}`
            console.log(scheduledDate, new Date());
            //if scheduled date has already passed, add a new charge
            if (scheduledDate <= (new Date()) || split.charge_day == 0) {
                console.log("Charge needed", split);
                await addSplitCharge(split, instance, description);
            } else {
                console.log("Scheduling split", split, instance, description)
                //uncomment this to make all things schedule 10 seconds in future
                // scheduledDate = new Date();
                // scheduledDate.setSeconds(scheduledDate.getSeconds() + 10);

                //schedule job  that adds a charge at  the correct date
                let job = schedule.scheduleJob(scheduledDate, addSplitCharge.bind(null, split, instance, description));
            }
        }

    }
}