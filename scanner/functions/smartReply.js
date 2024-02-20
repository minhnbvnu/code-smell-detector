async function smartReply({ msg, client }) {

    // console.log(msg.body)
    const data = msg?.body;
    const list = appconfig.bot;

    //Don't reply is sender is blocked
    const senderNumber = msg.from.split("@")[0]
    var blockedNumbers = appconfig.blocked
    var allowedNumbers = appconfig.allowed
    // check if blocked numnbers are there or not. 
    // if current number is init then return
    if (Array.isArray(blockedNumbers) && blockedNumbers.includes(senderNumber)) {
        console.log("Message received but sender is blocked so will not reply.")
        return;
    }

    if (Array.isArray(allowedNumbers) && allowedNumbers.length > 0 && !allowedNumbers.includes(senderNumber)) {
        console.log("Message received but user is not in allowed list so will not reply.")
        return;
    }

    // Don't do group reply if isGroupReply is off
    if (msg.id.participant && appconfig.appconfig.isGroupReply == false) {
        console.log(
            "Message received in group and group reply is off. so will not take any actions."
        );
        return;
    }

    // webhook Call
    await processWebhook({ msg, client });

    var exactMatch = list.find((obj) =>
        obj.exact.find((ex) => ex == data.toLowerCase())
    );

    if (exactMatch != undefined) {
        return sendReply({ msg, client, data: exactMatch });
    }
    var PartialMatch = list.find((obj) =>
        obj.contains.find((ex) => data.toLowerCase().search(ex) > -1)
    );
    if (PartialMatch != undefined) {
        return sendReply({ msg, client, data: PartialMatch });
    }
    sendReply({ msg, client, data: exactMatch, noMatch: true });
}