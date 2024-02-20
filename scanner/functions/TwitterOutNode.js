function TwitterOutNode(n) {
        RED.nodes.createNode(this,n);
        this.topic = n.topic;
        this.twitter = n.twitter;
        this.twitterConfig = RED.nodes.getNode(this.twitter);
        var credentials = RED.nodes.getCredentials(this.twitter);
        var node = this;
        node.status({});
        if (this.twitterConfig.oauth) {
            var twit = new Ntwitter({
                consumer_key: credentials.consumer_key,
                consumer_secret: credentials.consumer_secret,
                access_token_key: credentials.access_token,
                access_token_secret: credentials.access_token_secret
            });

            node.on("input", function(msg) {
                if (msg.hasOwnProperty("payload")) {
                    node.status({fill:"blue",shape:"dot",text:"twitter.status.tweeting"});
                    if (msg.payload.slice(0,2).toLowerCase() === "d ") {
                        var dm_user;
                        // direct message syntax: "D user message"
                        var t = msg.payload.match(/D\s+(\S+)\s+(.*)/).slice(1);
                        dm_user = t[0];
                        msg.payload = t[1];
                        var lookupPromise;
                        if (userSreenNameToIdCache.hasOwnProperty(dm_user)) {
                            lookupPromise = Promise.resolve();
                        } else {
                            lookupPromise = node.twitterConfig.getUsers(dm_user,"screen_name")
                        }
                        lookupPromise.then(function() {
                            if (userSreenNameToIdCache.hasOwnProperty(dm_user)) {
                                // Send a direct message
                                node.twitterConfig.post("https://api.twitter.com/1.1/direct_messages/events/new.json",{
                                    event: {
                                        type: "message_create",
                                        "message_create": {
                                            "target": {
                                                "recipient_id": userSreenNameToIdCache[dm_user]
                                            },
                                            "message_data": {"text": msg.payload}
                                        }
                                    }
                                }).then(function() {
                                    node.status({});
                                }).catch(function(err) {
                                    node.error(err,msg);
                                    node.status({fill:"red",shape:"ring",text:"twitter.status.failed"});
                                });
                            } else {
                                node.error("Unknown user",msg);
                                node.status({fill:"red",shape:"ring",text:"twitter.status.failed"});
                            }
                        }).catch(function(err) {
                            node.error(err,msg);
                            node.status({fill:"red",shape:"ring",text:"twitter.status.failed"});
                        })
                    } else {
                        if (msg.payload.length > 280) {
                            msg.payload = msg.payload.slice(0,279);
                            node.warn(RED._("twitter.errors.truncated"));
                        }
                        var mediaPromise;
                        if (msg.media && Buffer.isBuffer(msg.media)) {
                            // var mediaType = fileType(msg.media);
                            // if (mediaType === null) {
                            //     node.status({fill:"red",shape:"ring",text:"twitter.status.failed"});
                            //     node.error("msg.media is not a valid media object",msg);
                            //     return;
                            // }
                            mediaPromise = node.twitterConfig.post("https://upload.twitter.com/1.1/media/upload.json",null,null,{
                                media: msg.media
                            }).then(function(result) {
                                if (result.status === 200) {
                                    return result.body.media_id_string;
                                } else {
                                    throw new Error(result.body.errors[0]);
                                }
                            });

                        } else {
                            mediaPromise = Promise.resolve();
                        }
                        mediaPromise.then(function(mediaId) {
                            var params = msg.params || {};
                            params.status = msg.payload;
                            if (mediaId) {
                                params.media_ids = mediaId;
                            }
                            node.twitterConfig.post("https://api.twitter.com/1.1/statuses/update.json",{},params).then(function(result) {
                                if (result.status === 200) {
                                    node.status({});
                                } else {
                                    node.status({fill:"red",shape:"ring",text:"twitter.status.failed"});
                                    
                                    if ('error' in result.body && typeof result.body.error === 'string') {
                                        node.error(result.body.error,msg);
                                    } else {
                                        node.error(result.body.errors[0].message,msg);
                                    }
                                }
                            }).catch(function(err) {
                                node.status({fill:"red",shape:"ring",text:"twitter.status.failed"});
                                node.error(err,msg);
                            })
                        }).catch(function(err) {
                            node.status({fill:"red",shape:"ring",text:"twitter.status.failed"});
                            node.error(err,msg);
                        });
                        // if (msg.payload.length > 280) {
                        //     msg.payload = msg.payload.slice(0,279);
                        //     node.warn(RED._("twitter.errors.truncated"));
                        // }
                        // if (msg.media && Buffer.isBuffer(msg.media)) {
                        //     var apiUrl = "https://api.twitter.com/1.1/statuses/update_with_media.json";
                        //     var signedUrl = oa.signUrl(apiUrl,credentials.access_token,credentials.access_token_secret,"POST");
                        //     var r = request.post(signedUrl,function(err,httpResponse,body) {
                        //         if (err) {
                        //             node.error(err,msg);
                        //             node.status({fill:"red",shape:"ring",text:"twitter.status.failed"});
                        //         }
                        //         else {
                        //             var response = JSON.parse(body);
                        //             if (response.errors) {
                        //                 var errorList = response.errors.map(function(er) { return er.code+": "+er.message }).join(", ");
                        //                 node.error(RED._("twitter.errors.sendfail",{error:errorList}),msg);
                        //                 node.status({fill:"red",shape:"ring",text:"twitter.status.failed"});
                        //             }
                        //             else {
                        //                 node.status({});
                        //             }
                        //         }
                        //     });
                        //     var form = r.form();
                        //     form.append("status",msg.payload);
                        //     form.append("media[]",msg.media,{filename:"image"});
                        //
                        // } else {
                        //     if (typeof msg.params === 'undefined') { msg.params = {}; }
                        //     twit.updateStatus(msg.payload, msg.params, function (err, data) {
                        //         if (err) {
                        //             node.status({fill:"red",shape:"ring",text:"twitter.status.failed"});
                        //             node.error(err,msg);
                        //         }
                        //         node.status({});
                        //     });
                        // }
                    }
                }
            });
        } else {
            this.error(RED._("twitter.errors.missingcredentials"));
        }
    }