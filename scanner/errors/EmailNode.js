        this.on("input", function(msg, send, done) {
            if (msg.hasOwnProperty("payload")) {
                send = send || function() { node.send.apply(node,arguments) };
                if (smtpTransport) {
                    node.status({fill:"blue",shape:"dot",text:"email.status.sending"});
                    if (msg.to && node.name && (msg.to !== node.name)) {
                        node.warn(RED._("node-red:common.errors.nooverride"));
                    }
                    var sendopts = { from: ((msg.from) ? msg.from : node.userid) };   // sender address
                    sendopts.to = node.name || msg.to; // comma separated list of addressees
                    if (node.name === "") {
                        sendopts.cc = msg.cc;
                        sendopts.bcc = msg.bcc;
                        sendopts.inReplyTo = msg.inReplyTo;
                        sendopts.replyTo = msg.replyTo;
                        sendopts.references = msg.references;
                        sendopts.headers = msg.headers;
                        sendopts.priority = msg.priority;
                    }
                    if (msg.hasOwnProperty("topic") && msg.topic === '') { sendopts.subject = ""; }
                    else { sendopts.subject = msg.topic || msg.title || "Message from Node-RED"; } // subject line
                    if (msg.hasOwnProperty("header") && msg.header.hasOwnProperty("message-id")) {
                        sendopts.inReplyTo = msg.header["message-id"];
                        sendopts.subject = "Re: " + sendopts.subject;
                    }
                    if (msg.hasOwnProperty("envelope")) { sendopts.envelope = msg.envelope; }
                    if (Buffer.isBuffer(msg.payload)) { // if it's a buffer in the payload then auto create an attachment instead
                        if (!msg.filename) {
                            var fe = "bin";
                            if ((msg.payload[0] === 0xFF)&&(msg.payload[1] === 0xD8)) { fe = "jpg"; }
                            if ((msg.payload[0] === 0x47)&&(msg.payload[1] === 0x49)) { fe = "gif"; } //46
                            if ((msg.payload[0] === 0x42)&&(msg.payload[1] === 0x4D)) { fe = "bmp"; }
                            if ((msg.payload[0] === 0x89)&&(msg.payload[1] === 0x50)) { fe = "png"; } //4E
                            msg.filename = "attachment."+fe;
                        }
                        var fname = msg.filename.replace(/^.*[\\\/]/, '') || "attachment.bin";
                        sendopts.attachments = [ { content:msg.payload, filename:fname } ];
                        if (msg.hasOwnProperty("headers") && msg.headers.hasOwnProperty("content-type")) {
                            sendopts.attachments[0].contentType = msg.headers["content-type"];
                        }
                        // Create some body text..
                        if (msg.hasOwnProperty("description")) { sendopts.text = msg.description; }
                        else { sendopts.text = RED._("email.default-message",{filename:fname}); }
                    }
                    else {
                        var payload = RED.util.ensureString(msg.payload);
                        sendopts.text = payload; // plaintext body
                        if (/<[a-z][\s\S]*>/i.test(payload)) {
                            sendopts.html = payload; // html body
                            if (msg.hasOwnProperty("plaintext")) {
                                var plaintext = RED.util.ensureString(msg.plaintext);
                                sendopts.text = plaintext; // plaintext body - specific plaintext version
                            }
                        }
                        if (msg.attachments) {
                            if (!Array.isArray(msg.attachments)) { sendopts.attachments = [ msg.attachments ]; }
                            else { sendopts.attachments = msg.attachments; }
                            for (var a=0; a < sendopts.attachments.length; a++) {
                                if (sendopts.attachments[a].hasOwnProperty("content")) {
                                    if (typeof sendopts.attachments[a].content !== "string" && !Buffer.isBuffer(sendopts.attachments[a].content)) {
                                        node.error(RED._("email.errors.invalidattachment"),msg);
                                        node.status({fill:"red",shape:"ring",text:"email.status.sendfail"});
                                        return;
                                    }
                                }
                            }
                        }
                    }
                    smtpTransport.sendMail(sendopts, function(error, info) {
                        if (error) {
                            node.error(error,msg);
                            node.status({fill:"red",shape:"ring",text:"email.status.sendfail",response:error.response,msg:{to:msg.to,topic:msg.topic,id:msg._msgid}});
                        } else {
                            node.log(RED._("email.status.messagesent",{response:info.response}));
                            node.status({text:"",response:info.response,msg:{to:msg.to,topic:msg.topic,id:msg._msgid}});
                            if (done) { done(); }
                        }
                    });
                }
                else { node.warn(RED._("email.errors.nosmtptransport")); }
            }
            else { node.warn(RED._("email.errors.nopayload")); }
        });