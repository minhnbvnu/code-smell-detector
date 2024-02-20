function EmailMtaNode(n) {
        RED.nodes.createNode(this, n);
        this.port = n.port;
        this.secure = n.secure;
        this.starttls = n.starttls;
        this.certFile = n.certFile;
        this.keyFile = n.keyFile;
        this.users = n.users;
        this.auth = n.auth;
        try {
            this.options = JSON.parse(n.expert);
        } catch (error) {
            this.options = {};
        }
        var node = this;
        if (!Array.isArray(node.options.disabledCommands)) {
            node.options.disabledCommands = [];
        }
        node.options.secure = node.secure;
        if (node.certFile) {
            node.options.cert = fs.readFileSync(node.certFile);
        }
        if (node.keyFile) {
            node.options.key = fs.readFileSync(node.keyFile);
        }
        if (!node.starttls) {
            node.options.disabledCommands.push("STARTTLS");
        }
        if (!node.auth) {
            node.options.disabledCommands.push("AUTH");
        }

        node.options.onData = function (stream, session, callback) {
            simpleParser(stream, { skipTextToHtml:true, skipTextLinks:true }, (err, parsed) => {
                if (err) { node.error(RED._("email.errors.parsefail"),err); }
                else {
                    node.status({fill:"green", shape:"dot", text:""});
                    var msg = {}
                    msg.payload = parsed.text;
                    msg.topic = parsed.subject;
                    msg.date = parsed.date;
                    msg.header = {};
                    parsed.headers.forEach((v, k) => {msg.header[k] = v;});
                    if (parsed.html) { msg.html = parsed.html; }
                    if (parsed.to) {
                        if (typeof(parsed.to) === "string" && parsed.to.length > 0) { msg.to = parsed.to; }
                        else if (parsed.to.hasOwnProperty("text") && parsed.to.text.length > 0) { msg.to = parsed.to.text; }
                    }
                    if (parsed.cc) {
                        if (typeof(parsed.cc) === "string" && parsed.cc.length > 0) { msg.cc = parsed.cc; }
                        else if (parsed.cc.hasOwnProperty("text") && parsed.cc.text.length > 0) { msg.cc = parsed.cc.text; }
                    }
                    if (parsed.cc && parsed.cc.length > 0) { msg.cc = parsed.cc; }
                    if (parsed.bcc && parsed.bcc.length > 0) { msg.bcc = parsed.bcc; }
                    if (parsed.from && parsed.from.value && parsed.from.value.length > 0) { msg.from = parsed.from.value[0].address; }
                    if (parsed.attachments) { msg.attachments = parsed.attachments; }
                    else { msg.attachments = []; }
                    node.send(msg); // Propagate the message down the flow
                    setTimeout(function() { node.status({})}, 500);
                }
                callback();
            });
        }

        node.options.onAuth = function (auth, session, callback) {
            let id = node.users.findIndex(function (item) {
                return item.name === auth.username;
            });
            if (id >= 0 && node.users[id].password === auth.password) {
                callback(null, { user: id + 1 });
            } else {
                callback(new Error("Invalid username or password"));
            }
        }

        node.mta = new SMTPServer(node.options);

        node.mta.listen(node.port);

        node.mta.on("error", err => {
            node.error("Error: " + err.message, err);
        });

        node.on("close", function() {
            node.mta.close();
        });
    }