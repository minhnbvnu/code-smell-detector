async function processWebhook(webhook, message, body) {
    //if message is image then download it first and then call an webhook
    if (message.type == "image") {
        body.base64DataFile = await downloadFile(message)
    }
    fetch(webhook, {
        method: "POST",
        body: JSON.stringify(body),
        headers: {
            'Content-Type': 'application/json'
        }
    }).then((resp) => resp.json()).then(function (response) {
        //response received from server
        console.log(response);
        WAPI.sendSeen(message.chatId._serialized);
        //replying to the user based on response
        if (response && response.length > 0) {
            response.forEach(itemResponse => {
                itemResponse.text = itemResponse.text.fillVariables({ name: message.sender.pushname, phoneNumber: message.sender.id.user, greetings: greetings() });
                WAPI.sendMessage2(message.chatId._serialized, itemResponse.text);
                //sending files if there is any 
                if (itemResponse.files && itemResponse.files.length > 0) {
                    itemResponse.files.forEach((itemFile) => {
                        WAPI.sendImage(itemFile.file, message.chatId._serialized, itemFile.name);
                    })
                }
            });
        }
    }).catch(function (error) {
        console.log(error);
    });
}