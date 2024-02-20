async function sendReply({ msg, client, data, noMatch }) {


    if (noMatch) {
        if (appconfig.noMatch.length != 0) {
            let response = await getResponse(msg, appconfig.noMatch);;
            console.log(`No match found Replying with ${response}`);
            if (!configs.appconfig.quoteMessageInReply) {
                await client.sendMessage(msg.from, response);
            }
            else {
                await msg.reply(response);
            }
            return;
        }
        console.log(`No match found`);
        return;
    }

   
    
        let response = await getResponse(msg, data.response);
        console.log(`Replying with ${response}`);
    

    if (data.afterSeconds) {
        await utils.delay(data.afterSeconds * 1000);
    }
    

    if (data.file) {

        var captionStatus = data.responseAsCaption;

        // We consider undefined responseAsCaption as a false
        if (captionStatus == undefined) {
            captionStatus = false;
        }

        // files = await spintax.unspin(data.file);
        files = data.file
        if (Array.isArray(files)) {
            files.forEach(file => {
                sendFile(file)
            })
        }
        else {
            sendFile(files)
        }
        if(!captionStatus)
        {
            if (!configs.appconfig.quoteMessageInReply) {
                await client.sendMessage(msg.from, response);
            }
            else {
                await msg.reply(response);
            }
        }
        // if responseAsCaption is true, send image with response as a caption
        // else send image and response seperately
    } else {
        if (!configs.appconfig.quoteMessageInReply) {
            await client.sendMessage(msg.from, response);
        }
        else {
            await msg.reply(response);
        }
    }
    function sendFile(file) {
    
        if (captionStatus == true) {
            utils
                .getFileData(file)
                .then(async ({ fileMime, base64 }) => {

                    // console.log(fileMime);
                    // send response in place of caption as a last argument in below function call
                    var media = await new MessageMedia(
                        fileMime,
                        base64,
                        file
                    );
                    if (!configs.appconfig.quoteMessageInReply) {
                        await client.sendMessage(msg.from, media, { caption: response });
                    }
                    else {
                        // #TODO Caption is not working
                        const data = await msg.getChat();
                        // console.log(data)
                        // console.log({ caption: response })
                        // console.log(media)
                        await msg.reply(media, data.id._serialized, { caption: response });
                        // await msg.reply(media,);
                    }
                })
                .catch((error) => {
                    console.log("Error in sending file\n" + error);
                });
        } else {
            console.log(
                "Either the responseAsCaption is undefined or false, Make it true to allow caption to a file"
            );

            utils
                .getFileData(file)
                .then(async ({ fileMime, base64 }) => {
                    // console.log(fileMime);
                    // send blank in place of caption as a last argument in below function call
                    var media = await new MessageMedia(
                        fileMime,
                        base64,
                        file
                    );
                    if (!configs.appconfig.quoteMessageInReply) {
                        await client.sendMessage(msg.from, media);
                    }
                    else {
                        await msg.reply(media);
                    }
                })
                .catch((error) => {
                    console.log("Error in sending file\n" + error);
                })
        }
    }

}