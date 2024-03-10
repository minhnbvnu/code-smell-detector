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