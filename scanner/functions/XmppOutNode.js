function XmppOutNode(n) {
        RED.nodes.createNode(this,n);
        this.server = n.server;
        this.serverConfig = RED.nodes.getNode(this.server);
        this.nick = this.serverConfig.nickname || this.serverConfig.username.split("@")[0];
        this.join = n.join || false;
        this.sendAll = n.sendObject;
        this.to = n.to || "";
        this.quiet = false;
        // MUC == Multi-User-Chat == chatroom
        this.muc = this.join && (this.to !== "")
        var node = this;

        var xmpp = this.serverConfig.client;

        /* connection states
           online: We are connected
           offline: disconnected and will not autoretry
           connecting: Socket is connecting
           connect: Socket is connected
           opening: Stream is opening
           open: Stream is open
           closing: Stream is closing
           close: Stream is closed
           disconnecting: Socket is disconnecting
           disconnect: Socket is disconnected
        */

        // if we're already connected, then do the actions now, otherwise register a callback
        // if (xmpp.status === "online") {
        //     node.status({fill:"green",shape:"dot",text:"connected"});
        //     if (node.muc){
        //         // if we want to use a chatroom, we need to tell the server we want to join it
        //         joinMUC(node, xmpp, node.from+'/'+node.nick);
        //     }
        // }
        // sod it, register it anyway, that way things will work better on a reconnect:
        xmpp.on('online', function(data) {
            node.quiet = false;
            node.status({fill:"green",shape:"dot",text:"connected"});
            if (node.muc) {
                // if we want to use a chatroom, we need to tell the server we want to join it
                joinMUC(node, xmpp, node.from+'/'+node.nick);
            }
        });

        xmpp.on('connecting', async address => {
            if (!node.quiet) {
                node.status({fill:"grey",shape:"dot",text:"connecting"});
            }
        });
        xmpp.on('connect', async address => {
            node.status({fill:"grey",shape:"dot",text:"connected"});
        });
        xmpp.on('opening', async address => {
            node.status({fill:"grey",shape:"dot",text:"opening"});
        });
        xmpp.on('open', async address => {
            node.status({fill:"grey",shape:"dot",text:"open"});
        });
        xmpp.on('closing', async address => {
            node.status({fill:"grey",shape:"dot",text:"closing"});
        });
        xmpp.on('close', async address => {
            node.status({fill:"grey",shape:"dot",text:"closed"});
        });
        xmpp.on('disconnecting', async address => {
            node.status({fill:"grey",shape:"dot",text:"disconnecting"});
        });
        // we'll not add a offline catcher, as the error catcher should populate the status for us

        xmpp.on('error', function(err) {
            if (RED.settings.verbose || LOGITALL) { node.log(err); }
            errorHandler(node, err)
        });

        xmpp.on('stanza', async (stanza) => {
            if (stanza.attrs.type === 'error') {
                var error = stanza.getChild('error');
                if (error.attrs.code) {
                    var reas = "";
                    try {
                        reas = error.toString().split('><')[1].split(" xml")[0].trim();
                        if (reas == "registration-required") { reas = "membership-required"; }
                    }
                    catch(e) {}
                    if (error.attrs.code !== '404' && (error.attrs.code !== '400' && error.attrs.type !== 'wait')) {
                        var msg = {
                            topic:stanza.attrs.from,
                            payload: {
                                code:error.attrs.code,
                                status:"error",
                                reason:reas,
                                name:node.serverConfig.MUCs[stanza.attrs.from.split('/')[0]]
                            }
                        };
                        node.status({fill:"red",shape:"ring",text:"error : "+error.attrs.code+", "+error.attrs.type+", "+reas});
                        node.error(error.attrs.type+" error. "+error.attrs.code+" "+reas,msg);
                    }
                    else {
                        // ignore 404 error
                    }
                }
            }
        });

        //register with config
        this.serverConfig.register(this);
        // Now actually make the connection
        if (xmpp.status === "online") {
            node.status({fill:"green",shape:"dot",text:"online"});
        }
        else {
            node.status({fill:"grey",shape:"dot",text:"connecting"});
            if (xmpp.status === "offline") {
                xmpp.start().catch(error => {
                    node.error("Bad xmpp configuration; service: "+xmpp.options.service+" jid: "+node.serverConfig.jid);
                    node.warn(error);
                    node.warn(error.stack);
                    node.status({fill:"red",shape:"ring",text:"error"});
                });
            }
        }

        // Let's get down to business and actually send a message
        node.on("input", function(msg) {
            var to = node.to || msg.topic || "";
            if (msg.presence) {
                if (['away', 'dnd', 'xa', 'chat'].indexOf(msg.presence) > -1 ) {
                    var stanza = xml('presence', {"show":msg.presence}, xml('status', {}, msg.payload));
                    node.serverConfig.used(node);
                    xmpp.send(stanza);
                }
                else { node.warn("Can't set presence - invalid value: "+msg.presence); }
            }
            else if (msg.command) {
                if (msg.command === "subscribe") {
                    var stanza = xml('presence', {type:'subscribe', to:msg.payload});
                    node.serverConfig.used(node);
                    xmpp.send(stanza);
                }
                else if (msg.command === "get") {
                    var stanza = xml('iq',
                        {type:'get', id:node.id, to:to},
                        xml('query', 'http://jabber.org/protocol/muc#admin',
                            xml('item', {affiliation:msg.payload})
                        )
                    );
                    node.serverConfig.used(node);
                    if (RED.settings.verbose || LOGITALL) { node.log("sending stanza "+stanza.toString()); }
                    xmpp.send(stanza);
                }
                else if (msg.command === "info") {
                    var stanza = xml('iq',
                        {type:'get', id:node.id, to:to},
                        xml('query', 'http://jabber.org/protocol/disco#info')
                    );
                    node.serverConfig.used(node);
                    if (RED.settings.verbose || LOGITALL) { node.log("sending stanza "+stanza.toString()); }
                    xmpp.send(stanza);
                }
            }
            else {
                if (to !== "") {
                    var message;
                    var type = "chat";
                    if (node.join) {
                        // we want to connect to groupchat / chatroom / MUC
                        type = "groupchat";
                        // joinMUC will do nothing if we're already joined
                        joinMUC(node, xmpp, to+'/'+node.nick);
                    }
                    if (msg.subject) {
                        var stanza = xml(
                            "message",
                            { type:type, to:to, from:node.serverConfig.jid },
                            xml("subject", {}, msg.subject.toString())
                        );
                        node.serverConfig.used(node);
                        xmpp.send(stanza);
                    }
                    if (node.sendAll) {
                        message = xml(
                            "message",
                            { type: type, to: to },
                            xml("body", {}, JSON.stringify(msg))
                        );
                    }
                    else if (msg.payload) {
                        if (typeof(msg.payload) === "object") {
                            message = xml(
                                "message",
                                { type: type, to: to },
                                xml("body", {}, JSON.stringify(msg.payload))
                            );
                        }
                        else {
                            message = xml(
                                "message",
                                { type: type, to: to },
                                xml("body", {}, msg.payload.toString())
                            );
                        }
                    }
                    if (message) {
                        node.serverConfig.used(node);
                        xmpp.send(message);
                    }
                }
            }
        });

        node.on("close", function(removed, done) {
            if (RED.settings.verbose || LOGITALL) { node.log("Closing"); }
            node.status({fill:"grey",shape:"ring",text:"disconnected"});
            node.serverConfig.deregister(node, done);
        });
    }