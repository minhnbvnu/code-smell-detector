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