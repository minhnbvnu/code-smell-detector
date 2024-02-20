async function addSplitCharge(split, instance, description) {
    let Charge = require("../../models/charge");
    console.log("ADDING SPLIT CHARGE ", description);
    let chargeObject = {
        'user_id': instance.get('user_id'),
        'service_instance_id': instance.get('id'),
        'currency': instance.get('currency'),
        'amount': split.amount || 0,
        description,
        "subscription_id": instance.get("subscription_id"),
        "approved": true

    };

    //create new charge and approve it
    let newCharge = new Charge(await Charge.createPromise(chargeObject));
    try {
        await newCharge.approve()
    } catch (e) {
        console.error("Error adding split charge", e);
        newCharge.data.approved = false;
        await newCharge.update();
    }
    //todo: error case?
}