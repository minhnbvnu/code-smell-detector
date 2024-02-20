function EmailNode(n) {
        RED.nodes.createNode(this,n);
        this.topic = n.topic;
        this.name = n.name;
        this.outserver = n.server;
        this.outport = n.port;
        this.secure = n.secure;
        this.tls = true;
        this.authtype = n.authtype || "BASIC";
        if (this.authtype !== "BASIC") {
            this.inputs = 1;
            this.repeat = 0;
        }
        if (this.credentials && this.credentials.hasOwnProperty("userid")) {
            this.userid = this.credentials.userid;
        }
        else if (this.authtype !== "NONE") {
            this.error(RED._("email.errors.nouserid"));
        }
        if (this.authtype === "BASIC" ) {
            if (this.credentials && this.credentials.hasOwnProperty("password")) {
                this.password = this.credentials.password;
            }
            else {
                this.error(RED._("email.errors.nopassword"));
            }
        }
        else if (this.authtype === "XOAUTH2") {
            this.saslformat = n.saslformat;
            if (n.token !== "") {
                this.token = n.token;
            } else {
                this.error(RED._("email.errors.notoken"));
            }
        }
        if (n.tls === false) { this.tls = false; }
        var node = this;

        var smtpOptions = {
            host: node.outserver,
            port: node.outport,
            secure: node.secure,
            tls: {rejectUnauthorized: node.tls}
        }

        if (node.authtype === "BASIC" ) {
            smtpOptions.auth = {
                user: node.userid,
                pass: node.password
            };
        }
        else if (node.authtype === "XOAUTH2") {
            var value = RED.util.getMessageProperty(msg,node.token);
            if (value !== undefined) {
                if (node.saslformat) {
                    //Make base64 string for access - compatible with outlook365 and gmail
                    saslxoauth2 = Buffer.from("user="+node.userid+"\x01auth=Bearer "+value+"\x01\x01").toString('base64');
                } else {
                    saslxoauth2 = value;
                }
            }
            smtpOptions.auth = {
                type: "OAuth2",
                user: node.userid,
                accessToken: saslxoauth2
            };
        }
        var smtpTransport = nodemailer.createTransport(smtpOptions);

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
    }