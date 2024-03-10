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