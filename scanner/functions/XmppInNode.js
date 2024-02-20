function XmppInNode(n) {
        RED.nodes.createNode(this,n);
        this.server = n.server;
        this.serverConfig = RED.nodes.getNode(this.server);
        this.nick = this.serverConfig.nickname || this.serverConfig.username.split("@")[0];
        this.join = n.join || false;
        this.sendAll = n.sendObject;
        // Yes, it's called "from", don't ask me why; I don't know why
        // (because it's where you are asking to get messages from...)
        this.from = ((n.to || "").split(':')).map(s => s.trim());
        this.quiet = false;
        this.subject = {};
        // MUC == Multi-User-Chat == chatroom
        //this.muc = this.join && (this.from !== "")
        var node = this;

        var joinrooms = function() {
            if (node.from[0] === "") {
                // try to get list of all rooms and join them all.
                getItems(node.serverConfig.server, node.serverConfig.id, xmpp);
            }
            else {
                // if we want to use a chatroom, we need to tell the server we want to join it
                for (var i=0; i<node.from.length; i++) {
                    joinMUC(node, xmpp, node.from[i]+'/'+node.nick);
                }
            }
        }

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
        //     if (node.muc) {
        //         joinMUC(node, xmpp, node.from+'/'+node.nick);
        //     }
        // }
        // sod it, register it anyway, that way things will work better on a reconnect:
        xmpp.on('online', async address => {
            node.quiet = false;
            node.status({fill:"green",shape:"dot",text:"connected"});
            if (node.join) {
                node.jointick = setInterval(function() { joinrooms(); }, 60000);
                joinrooms();
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
            node.status({fill:"grey",shape:"ring",text:"closed"});
        });
        xmpp.on('disconnecting', async address => {
            node.status({fill:"grey",shape:"dot",text:"disconnecting"});
        });
        // we'll not add a offline catcher, as the error catcher should populate the status for us

        // Should we listen on other's status (chatstate) or a chatroom state (groupbuddy)?
        xmpp.on('error', err => {
            if (RED.settings.verbose || LOGITALL) { node.log("XMPP Error: "+err); }
            errorHandler(node, err);
        });

        // Meat of it, a stanza object contains chat messages (and other things)
        xmpp.on('stanza', async (stanza) => {
            if (RED.settings.verbose || LOGITALL) { node.log(stanza); }
            if (stanza.is('message')) {
                var subj = stanza.getChild("subject");
                if (subj) {
                    subj = subj.getText();
                    if (subj.trim() !== "") { node.subject[stanza.attrs.from.split('/')[0]] = subj; }
                }
                if (stanza.attrs.type == 'chat') {
                    var body = stanza.getChild('body');
                    if (body) {
                        var msg = { payload:body.getText(), subject:node.subject[stanza.attrs.from.split('/')[0]] };
                        var ids = stanza.attrs.from.split('/');
                        if (ids.length > 1 && ids[1].length !== 36) {
                            msg.topic = stanza.attrs.from
                        }
                        else { msg.topic = ids[0]; }
                        // if (RED.settings.verbose || LOGITALL) { node.log("Received a message from "+stanza.attrs.from); }
                        if (!node.join && ((node.from[0] === "") || (node.from.includes(stanza.attrs.from.split('/')[0])) || (node.from.includes(stanza.attrs.from.split('/')[1]))  )) {
                            node.send([msg,null]);
                        }
                    }
                }
                else if (stanza.attrs.type == 'groupchat') {
                    const parts = stanza.attrs.from.split("/");
                    var conference = parts[0];
                    var from = parts[1];
                    var msg = { topic:from, room:conference, subject:node.subject[stanza.attrs.from.split('/')[0]] };
                    var body = stanza.getChild('body');
                    if (typeof body !== "undefined") {
                        msg.payload = body.getText();
                        //if (from && stanza.attrs.from != node.nick && from != node.nick) {
                        if (from && node.join && (node.from[0] === "" || node.from.includes(conference))) {
                            node.send([msg,null]);
                        }
                    }
                    //}
                }
            }
            else if (stanza.is('presence')) {
                if (['subscribe','subscribed','unsubscribe','unsubscribed'].indexOf(stanza.attrs.type) > -1) {
                    // this isn't for us, let the config node deal with it.
                }
                else {
                    if (stanza.attrs.type === 'error') {
                        var error = stanza.getChild('error');
                        if (error.attrs.code) {
                            var reas = "";
                            try {
                                reas = error.toString().split('><')[1].split(" xml")[0].trim();
                                if (reas == "registration-required") { reas = "membership-required"; }
                            }
                            catch(e) { }
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
                                node.send([null,msg]);
                                node.status({fill:"red",shape:"ring",text:"error : "+error.attrs.code+", "+error.attrs.type+", "+reas});
                                node.error(error.attrs.type+" error. "+error.attrs.code+" "+reas,msg);
                            }
                            else {
                                // ignore 404 error
                            }
                        }
                        return;
                    }

                    var state = stanza.getChild('show');
                    if (state) { state = state.getText(); }
                    else { state = "available"; }
                    var statusText="";
                    if (stanza.attrs.type === 'unavailable') {
                        // the user might not exist, but the server doesn't tell us that!
                        statusText = "offline";
                        state = "offline";
                    }
                    else {
                        statusText = "online";
                        state = "online";
                    }

                    var status = stanza.getChild('status');
                    if (status !== undefined) {
                        statusText = status.getText() || "online";
                    }

                    if (statusText !== "" && stanza.attrs.from && (stanza.attrs.from !== stanza.attrs.to)) {
                        var from = stanza.attrs.from;
                        var msg = {
                            topic:from,
                            payload: {
                                presence:state,
                                status:statusText,
                                name:stanza.attrs.from.split('/')[1]
                            }
                        };
                        node.send([null,msg]);
                    }
                    else {
                        if (RED.settings.verbose || LOGITALL) {
                            node.log("not propagating blank status");
                            node.log(stanza);
                        }
                    }
                }
            }
            else if (stanza.attrs.type === 'result') {
                // AM To-Do check for 'bind' result with our current jid
                var query = stanza.getChild('query');
                if (RED.settings.verbose || LOGITALL) { this.log("result!"); }
                if (RED.settings.verbose || LOGITALL) { this.log(query); }

                // handle query for list of rooms available
                if (query && query.attrs.hasOwnProperty("xmlns") && query.attrs["xmlns"] === "http://jabber.org/protocol/disco#items") {
                    var _items = stanza.getChild('query').getChildren('item');
                    for (var i = 0; i<_items.length; i++) {
                        if ( _items[i].attrs.jid.indexOf('@') === -1 ) {
                            // if no @ in jid then it's probably the root or the room server so ask again
                            getItems(_items[i].attrs.jid,this.serverConfig.jid,xmpp);
                        }
                        else {
                            var name = _items[i].attrs.jid+'/'+node.serverConfig.username;
                            if (!(name in node.serverConfig.MUCs)) {
                                if (RED.settings.verbose || LOGITALL) { node.log("Need to Join room:"+name); }
                                joinMUC(node, xmpp, name);
                                node.serverConfig.MUCs[name.split('/')[0]] = _items[i].attrs.name.split('/')[0];
                            }
                            else {
                                if (RED.settings.verbose || LOGITALL) { node.log("Already joined:"+name); }
                            }
                        }
                    }
                }
                if (query && query.attrs.hasOwnProperty("xmlns") && query.attrs["xmlns"] === "http://jabber.org/protocol/disco#info") {
                    var fe = [];
                    var _items = stanza.getChild('query').getChildren('feature');
                    for (var i = 0; i<_items.length; i++) {
                        fe.push(_items[i].attrs);
                    }
                    var id = []
                    var _idents = stanza.getChild('query').getChildren('identity');
                    for (var i = 0; i<_idents.length; i++) {
                        id.push(_idents[i].attrs);
                    }
                    var from = stanza.attrs.from;
                    var msg = {topic:from, payload: { identity:id, features:fe} };
                    node.send([null,msg]);
                }
            }
        });

        // xmpp.on('subscribe', from => {
        //   xmpp.acceptSubscription(from);
        // });

        //register with config
        this.serverConfig.register(this);
        // Now actually make the connection
        try {
            if (xmpp.status === "online") {
                node.status({fill:"green",shape:"dot",text:"connected"});
            }
            else {
                node.status({fill:"grey",shape:"dot",text:"connecting"});
                if (xmpp.status === "offline") {
                    if (RED.settings.verbose || LOGITALL) {
                        node.log("starting xmpp client");
                    }
                    xmpp.start().catch(error => {
                        node.warn("Got error on start: "+error);
                        node.warn("XMPP Status is now: "+xmpp.status)
                    });
                }
            }
        }
        catch(e) {
            node.error("Bad xmpp configuration; service: "+xmpp.options.service+" jid: "+node.serverConfig.jid);
            node.warn(e.stack);
            node.status({fill:"red",shape:"ring",text:"disconnected"});
        }

        node.on("close", function(removed, done) {
            if (node.jointick) { clearInterval(node.jointick); }
            node.status({fill:"grey",shape:"ring",text:"disconnected"});
            node.serverConfig.deregister(node, done);
        });
    }