async function processMessages(data) {
    for (let i = 0; i < data.length; i++) {
        //fetch API to send and receive response from server
        let message = data[i];
        body = {};
        body.text = message.body;
        body.type = 'message';
        body.user = message.chatId._serialized;
        //body.original = message;
        if (intents.appconfig.downloadMedia) {
            downloadFile(message)
        }
        //global webhook, this will be called no matter what if this is not blank
        if (intents.appconfig.webhook) {
            window.log("Processing global webhook")
            processWebhook(intents.appconfig.webhook, message, body)
        }
        window.log(`Message from ${message.chatId.user} checking..`);
        if (intents.blocked.indexOf(message.chatId.user) >= 0) {
            window.log("number is blocked by BOT. no reply");
            continue;
        }
        if (message.type == "chat") {
            //message.isGroupMsg to check if this is a group
            if (message.isGroupMsg == true && intents.appconfig.isGroupReply == false) {
                window.log("Message received in group and group reply is off. so will not take any actions.");
                continue;
            }
            var exactMatch = intents.bot.find(obj => obj.exact.find(ex => ex == message.body.toLowerCase()));
            var response = "";
            if (exactMatch != undefined) {
                response = await resolveSpintax(exactMatch.response);
                window.log(`Replying with ${response}`);
            }
            var PartialMatch = intents.bot.find(obj => obj.contains.find(ex => message.body.toLowerCase().search(ex) > -1));
            if (PartialMatch != undefined) {
                response = await resolveSpintax(PartialMatch.response);
                window.log(`Replying with ${response}`);
            }
            WAPI.sendSeen(message.chatId._serialized);
            response = response.fillVariables({ name: message.sender.pushname, phoneNumber: message.sender.id.user, greetings: greetings() })
            await waitBeforeSending(exactMatch, PartialMatch)
            if (exactMatch != undefined || PartialMatch != undefined) {

                // sending file if there is any
                // else send only response
                if ((exactMatch || PartialMatch).file != undefined) {
                    var captionStatus = (exactMatch || PartialMatch).responseAsCaption;
                    // We consider undefined responseAsCaption as a false
                    if (captionStatus == undefined) {
                        captionStatus = false;
                    }

                    files = await resolveSpintax((exactMatch || PartialMatch).file);

                    // if responseAsCaption is true, send image with response as a caption
                    // else send image and response seperately
                    if (captionStatus == true) {
                        window.getFile(files).then((base64Data) => {
                            // send response in place of caption as a last argument in below function call
                            WAPI.sendImage(base64Data, message.chatId._serialized, files, response);
                        }).catch((error) => {
                            window.log("Error in sending file\n" + error);
                        });
                    } else {
                        window.log("Either the responseAsCaption is undefined or false, Make it true to allow caption to a file");
                        window.getFile(files).then((base64Data) => {
                            // send blank in place of caption as a last argument in below function call
                            WAPI.sendImage(base64Data, message.chatId._serialized, files, "");
                        }).catch((error) => {
                            window.log("Error in sending file\n" + error);
                        });
                        WAPI.sendMessage2(message.chatId._serialized, response);
                    }
                } else {
                    // We just need to send the response as we already checked no file is attached (in above if)
                    WAPI.sendMessage2(message.chatId._serialized, response);
                }

                //call a webhook if there is one in (exactMatch || PartialMatch)
                if ((exactMatch || PartialMatch).webhook) {
                    //okay there is a webhook so let's call it
                    window.log("Processing webhook from block")
                    processWebhook((exactMatch || PartialMatch).webhook, message, body)
                }
            } else {
                // We are sure we haven't found any exact or partial match
                // as we are already checking it in the above if statement
                // So process with the noMatch logic only
                response = await resolveSpintax(intents.noMatch);
                window.log(`No exact or partial match found. So replying with ${response} instead`);
                WAPI.sendMessage2(message.chatId._serialized, response);
            }
        }
    }
}