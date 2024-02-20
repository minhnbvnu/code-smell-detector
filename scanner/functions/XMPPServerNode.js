function XMPPServerNode(n) {
        RED.nodes.createNode(this,n);
        this.nickname = n.nickname;
        this.jid = n.user;
        if (this.jid.match(/\@/)) {
            this.username = n.user.split('@')[0];
        }
        else {
            this.username = n.user;
            this.jid = n.user+'@'+n.server;
        }
        // The user may elect to just specify the jid in the settings,
        //  in which case extract the server from the jid and default the port
        if ("undefined" === typeof n.server || n.server === "") {
            this.server = n.user.split('@')[1];
        }
        else {
            this.server = n.server;
        }
        if ("undefined" === typeof n.port || n.port === "") {
            this.port = 5222;
        }
        else {
            this.port = parseInt(n.port);
        }
        this.domain = this.jid.split('@')[1] || this.server;
        this.resource = n.resource || "";

        // The password is obfuscated and stored in a separate location
        var credentials = this.credentials;
        if (credentials) {
            this.password = credentials.password;
        }
        // The basic xmpp client object, this will be referred to as "xmpp" in the nodes.
        // note we're not actually connecting here.
        var proto = "xmpp";
        if (this.port === 5223) {
            proto = "xmpps";
        }
        if (RED.settings.verbose || LOGITALL) {
            this.log("Setting up connection xmpp: {service: "+proto+"://"+this.server+":"+this.port+", username: "+this.username+", password: "+this.password+"}");
        }
        var opts = {
            service: proto+'://' + this.server + ':' + this.port,
            domain: this.domain,
            username: this.username,
            password: this.password,
            timeout: 60000
        }
        if (this.resource !== "") { opts.resource = this.resource; }
        this.client = client(opts);

        this.client.timeout = 60000;
        // helper variable for checking against later, maybe we should be using the client
        // object directly...
        this.connected = false;
        // store the nodes that have us as config so we know when to tear it all down.
        this.users = {};
        // store the chatrooms (MUC) that we've joined (sent "presence" XML to) already
        this.MUCs = {};
        // helper variable, because "this" changes definition inside a callback
        var that = this;

        // function for a node to tell us it has us as config
        this.register = function(xmppThat) {
            if (RED.settings.verbose || LOGITALL) {that.log("registering "+xmppThat.id); }
            that.users[xmppThat.id] = xmppThat;
            // So we could start the connection here, but we already have the logic in the nodes that takes care of that.
            // if (Object.keys(that.users).length === 1) {
            //   this.client.start();
            // }
        };

        // function for a node to tell us it's not using us anymore
        this.deregister = function(xmppThat,done) {
            if (RED.settings.verbose || LOGITALL) {that.log("deregistering "+xmppThat.id); }
            delete that.users[xmppThat.id];
            if (that.closing) {
                return done();
            }
            if (Object.keys(that.users).length === 0) {
                if (that.client && that.client.connected) {
                    return that.client.stop(done);
                }
                else {
                    return done();
                }
            }
            done();
        };

        // store the last node to use us, in case we get an error back
        this.lastUsed = undefined;

        // function for a node to tell us it has just sent a message to our server
        // so we know which node to blame if it all goes Pete Tong
        this.used = function(xmppThat) {
            if (RED.settings.verbose || LOGITALL) {that.log(xmppThat.id+" sent a message to the xmpp server"); }
            that.lastUsed = xmppThat;
        }

        // Some errors come back as a message :-(
        // this means we need to figure out which node might have sent it
        // we also deal with subscriptions (i.e. presence information) here
        this.client.on('stanza', async (stanza) => {
            //console.log("STANZA",stanza.toString())
            if (stanza.is('message')) {
                if (stanza.attrs.type == 'error') {
                    if (RED.settings.verbose || LOGITALL) {
                        that.log("Received error");
                        that.log(stanza);
                    }
                    var err = stanza.getChild('error');
                    if (err) {
                        var textObj = err.getChild('text');
                        var text = "error";
                        if (typeof textObj !== "undefined") {
                            text = textObj.getText();
                        }
                        else {
                            textObj = err.getAttr('code');
                            if (typeof textObj !== "undefined") {
                                text = textObj;
                            }
                        }
                        if (RED.settings.verbose || LOGITALL) {that.log("Culprit: "+that.lastUsed.id); }
                        if (typeof that.lastUsed !== "undefined") {
                            that.lastUsed.status({fill:"yellow",shape:"dot",text:"warning. "+text});
                            that.lastUsed.warn("Warning. "+text);
                            if (that.lastUsed.join) {
                                // it was trying to MUC things up
                                clearMUC(that);
                            }
                        }
                        if (RED.settings.verbose || LOGITALL) {
                            that.log("We did wrong: Error "+text);
                            that.log(stanza);
                        }

                        // maybe throw the message or summit
                        //that.error(text);
                    }
                }
            }
            else if (stanza.is('presence')) {
                if (['subscribe','subscribed','unsubscribe','unsubscribed'].indexOf(stanza.attrs.type) > -1) {
                    if (RED.settings.verbose || LOGITALL) {that.log("got a subscription based message"); }
                    switch(stanza.attrs.type) {
                    case 'subscribe':
                        // they're asking for permission let's just say yes
                        var response = xml('presence',
                            {type:'subscribed', to:stanza.attrs.from});
                        // if an error comes back we can't really blame anyone else
                        that.used(that);
                        that.client.send(response);
                        break;
                    default:
                        that.log("Was told we've "+stanza.attrs.type+" from "+stanza.attrs.from+" but we don't really care");
                    }
                }
                if (stanza.attrs.to && stanza.attrs.to.indexOf(that.jid) !== -1) {
                    var _x = stanza.getChild("x")
                    if (_x !== undefined) {
                        var _stat = _x.getChildren("status");
                        for (var i = 0; i<_stat.length; i++) {
                            if (_stat[i].attrs.code == 201) {
                                if (RED.settings.verbose || LOGITALL) {that.log("created new room"); }
                                var stanza = xml('iq',
                                    {type:'set', id:that.id, from:that.jid, to:stanza.attrs.from.split('/')[0]},
                                    xml('query', 'http://jabber.org/protocol/muc#owner',
                                        xml('x', {xmlns:'jabber:x:data', type:'submit'})
                                    )
                                );
                                that.client.send(stanza);
                            }
                        }
                    }
                }
            }
            else if (stanza.is('iq')) {
                if (RED.settings.verbose || LOGITALL) {that.log("got an iq query"); }
                if (stanza.attrs.type === 'error') {
                    if (RED.settings.verbose || LOGITALL) {that.log("oh noes, it's an error"); }
                    if (that?.lastUsed?.id && stanza.attrs.id === that.lastUsed.id) {
                        that.lastUsed.status({fill:"red", shape:"ring", text:stanza.getChild('error')});
                        that.lastUsed.warn(stanza.getChild('error'));
                    }
                }
            }
        });

        // We shouldn't have any errors here that the input/output nodes can't handle
        //   if you need to see everything though; uncomment this block
        // this.client.on('error', err => {
        //   that.warn(err);
        //   that.warn(err.stack);
        // });

        // this gets called when we've completed the connection
        this.client.on('online', async address => {
            // provide some presence so people can see we're online
            that.connected = true;
            await that.client.send(xml('presence'));
            //      await that.client.send(xml('presence', {type: 'available'},xml('status', {}, 'available')));
            if (RED.settings.verbose || LOGITALL) {that.log('connected as '+that.username+' to ' +that.server+':'+that.port); }
        });

        // if the connection has gone away, not sure why!
        this.client.on('offline', () => {
            that.connected = false;
            if (RED.settings.verbose || LOGITALL) {that.log('connection closed'); }
        });

        // gets called when the node is destroyed, e.g. if N-R is being stopped.
        this.on("close", async done => {
            const rooms = Object.keys(this.MUCs)
            for (const room of rooms) {
                await that.client.send(xml('presence', {to:room, type:'unavailable'}));
            }
            if (that.connected) {
                await that.client.send(xml('presence', {type:'unavailable'}));
                try{
                    if (RED.settings.verbose || LOGITALL) {
                        that.log("Calling stop() after close, status is "+that.client.status);
                    }
                    await that.client.stop().then(that.log("XMPP client stopped")).catch(error=>{that.warn("Got an error whilst closing xmpp session: "+error)});
                }
                catch(e) {
                    that.warn(e);
                }
            }
            done();
        });
    }