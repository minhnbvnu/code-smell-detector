async function checkPOP3(msg,send,done) {
            var tout = (node.repeat > 0) ? node.repeat - 500 : 15000;
            var saslxoauth2 = "";
            var currentMessage = 1;
            var maxMessage = 0;
            var nextMessage;

            pop3 = new Pop3Command({
                "host": node.inserver,
                "tls": node.useSSL,
                "timeout": tout,
                "port": node.inport
            });
            try {
                node.status({fill:"grey",shape:"dot",text:"node-red:common.status.connecting"});
                await pop3.connect();
                if (node.authtype === "XOAUTH2") {
                    var value = RED.util.getMessageProperty(msg,node.token);
                    if (value !== undefined) {
                        if (node.saslformat) {
                            //Make base64 string for access - compatible with outlook365 and gmail
                            saslxoauth2 = Buffer.from("user="+node.userid+"\x01auth=Bearer "+value+"\x01\x01").toString('base64');
                        } else {
                            saslxoauth2 = value;
                        }
                    }
                    await pop3.command('AUTH', "XOAUTH2");
                    await pop3.command(saslxoauth2);

                } else if (node.authtype === "BASIC") {
                    await pop3.command('USER', node.userid);
                    await pop3.command('PASS', node.password);
                }
            } catch(err) {
                node.error(err.message,err);
                node.status({fill:"red",shape:"ring",text:"email.status.connecterror"});
                setInputRepeatTimeout();
                done();
                return;
            }
            maxMessage = (await pop3.STAT()).split(" ")[0];
            if (maxMessage>0) {
                node.status({fill:"blue", shape:"dot", text:"email.status.fetching"});
                while(currentMessage<=maxMessage) {
                    try {
                        nextMessage = await pop3.RETR(currentMessage);
                    } catch(err) {
                        node.error(RED._("email.errors.fetchfail", err.message),err);
                        node.status({fill:"red",shape:"ring",text:"email.status.fetcherror"});
                        setInputRepeatTimeout();
                        done();
                        return;
                    }
                    try {
                        // We have now received a new email message.  Create an instance of a mail parser
                        // and pass in the email message.  The parser will signal when it has parsed the message.
                        simpleParser(nextMessage, {}, function(err, parsed) {
                            //node.log(util.format("simpleParser: on(end): %j", mailObject));
                            if (err) {
                                node.status({fill:"red", shape:"ring", text:"email.status.parseerror"});
                                node.error(RED._("email.errors.parsefail", {folder:node.box}), err);
                            }
                            else {
                                processNewMessage(msg, parsed);
                            }
                        });
                        //processNewMessage(msg, nextMessage);
                    } catch(err) {
                        node.error(RED._("email.errors.parsefail", {folder:node.box}), err);
                        node.status({fill:"red",shape:"ring",text:"email.status.parseerror"});
                        setInputRepeatTimeout();
                        done();
                        return;
                    }
                    await pop3.DELE(currentMessage);
                    currentMessage++;
                }
                await pop3.QUIT();
                node.status({fill:"green",shape:"dot",text:"finished"});
                setTimeout(status_clear, 5000);
                setInputRepeatTimeout();
                done();
            }

        }