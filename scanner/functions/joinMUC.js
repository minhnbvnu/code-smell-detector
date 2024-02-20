function joinMUC(node, xmpp, name) {
        // the presence with the muc x element signifies we want to join the muc
        // if we want to support passwords, we need to add that as a child of the x element
        // (third argument to the x/muc/children )
        // We also turn off chat history (maxstanzas 0) because that's not what this node is about.
        // Yes, there's a race condition, but it's not a huge problem to send two messages
        // so we don't care.
        var mu = name.split("/")[0];
        if (mu in node.serverConfig.MUCs) {
            if (RED.settings.verbose || LOGITALL) { node.log("already joined MUC "+name); }
        }
        else {
            var stanza = xml('presence',
                {"to":name},
                xml("x",'http://jabber.org/protocol/muc',
                    xml("history", {maxstanzas:0, seconds:1})   // We don't want any history
                )
            );
            if (node.hasOwnProperty("credentials") && node.credentials.hasOwnProperty("password")) {
                stanza = xml('presence',
                    {"to":name},
                    xml("x",'http://jabber.org/protocol/muc',
                        xml("history", {maxstanzas:0, seconds:1}),   // We don't want any history
                        xml("password", {}, node.credentials.password)   // Add the password
                    )
                );
            }
            node.serverConfig.used(node);
            node.serverConfig.MUCs[mu] = "joined";
            if (RED.settings.verbose || LOGITALL) { node.log("JOINED "+mu); }
            xmpp.send(stanza);
        }
    }