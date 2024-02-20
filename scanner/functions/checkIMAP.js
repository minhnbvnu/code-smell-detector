function checkIMAP(msg,send,done) {
            var tout = (node.repeat > 0) ? node.repeat - 500 : 15000;
            var saslxoauth2 = "";
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
                imap = new Imap({
                    xoauth2: saslxoauth2,
                    host: node.inserver,
                    port: node.inport,
                    tls: node.useSSL,
                    autotls: node.autotls,
                    tlsOptions: { rejectUnauthorized: false },
                    connTimeout: tout,
                    authTimeout: tout
                });
            } else {
                imap = new Imap({
                    user: node.userid,
                    password: node.password,
                    host: node.inserver,
                    port: node.inport,
                    tls: node.useSSL,
                    autotls: node.autotls,
                    tlsOptions: { rejectUnauthorized: false },
                    connTimeout: tout,
                    authTimeout: tout
                });
            }
            imap.on('error', function(err) {
                if (err.errno !== "ECONNRESET") {
                    s = false;
                    node.error(err.message,err);
                    node.status({fill:"red",shape:"ring",text:"email.status.connecterror"});
                }
                setInputRepeatTimeout();
            });
            //console.log("Checking IMAP for new messages");
            // We get back a 'ready' event once we have connected to imap
            s = true;
            imap.once("ready", function() {
                if (ss === true) { return; }
                ss = true;
                node.status({fill:"blue", shape:"dot", text:"email.status.fetching"});
                //console.log("> ready");
                // Open the folder
                imap.openBox(node.box, // Mailbox name
                    false, // Open readonly?
                    function(err, box) {
                    //console.log("> Inbox err : %j", err);
                    //console.log("> Inbox open: %j", box);
                        if (err) {
                            var boxs = [];
                            imap.getBoxes(function(err,boxes) {
                                if (err) { return; }
                                for (var prop in boxes) {
                                    if (boxes.hasOwnProperty(prop)) {
                                        if (boxes[prop].children) {
                                            boxs.push(prop+"/{"+Object.keys(boxes[prop].children)+'}');
                                        }
                                        else { boxs.push(prop); }
                                    }
                                }
                                node.error(RED._("email.errors.fetchfail", {folder:node.box+".  Folders - "+boxs.join(', ')}),err);
                            });
                            node.status({fill:"red", shape:"ring", text:"email.status.foldererror"});
                            imap.end();
                            s = false;
                            setInputRepeatTimeout();
                            done(err);
                            return;
                        }
                        else {
                            var criteria = ((node.criteria === '_msg_')?
                                (msg.criteria || ["UNSEEN"]):
                                ([node.criteria]));
                            if (Array.isArray(criteria)) {
                                try {
                                    imap.search(criteria, function(err, results) {
                                        if (err) {
                                            node.status({fill:"red", shape:"ring", text:"email.status.foldererror"});
                                            node.error(RED._("email.errors.fetchfail", {folder:node.box}),err);
                                            imap.end();
                                            s = false;
                                            setInputRepeatTimeout();
                                            done(err);
                                            return;
                                        }
                                        else {
                                        //console.log("> search - err=%j, results=%j", err, results);
                                            if (results.length === 0) {
                                            //console.log(" [X] - Nothing to fetch");
                                                node.status({results:0});
                                                imap.end();
                                                s = false;
                                                setInputRepeatTimeout();
                                                msg.payload = 0;
                                                done();
                                                return;
                                            }

                                            var marks = false;
                                            if (node.disposition === "Read") { marks = true; }
                                            // We have the search results that contain the list of unseen messages and can now fetch those messages.
                                            var fetch = imap.fetch(results, {
                                                bodies: '',
                                                struct: true,
                                                markSeen: marks
                                            });

                                            // For each fetched message returned ...
                                            fetch.on('message', function(imapMessage, seqno) {
                                            //node.log(RED._("email.status.message",{number:seqno}));
                                            //console.log("> Fetch message - msg=%j, seqno=%d", imapMessage, seqno);
                                                imapMessage.on('body', function(stream, info) {
                                                //console.log("> message - body - stream=?, info=%j", info);
                                                    simpleParser(stream, {}, function(err, parsed) {
                                                        if (err) {
                                                            node.status({fill:"red", shape:"ring", text:"email.status.parseerror"});
                                                            node.error(RED._("email.errors.parsefail", {folder:node.box}),err);
                                                        }
                                                        else {
                                                            processNewMessage(msg, parsed);
                                                        }
                                                    });
                                                }); // End of msg->body
                                            }); // End of fetch->message

                                            // When we have fetched all the messages, we don't need the imap connection any more.
                                            fetch.on('end', function() {
                                                node.status({results:results.length});
                                                var cleanup = function() {
                                                    imap.end();
                                                    s = false;
                                                    setInputRepeatTimeout();
                                                    msg.payload = results.length;
                                                    done();
                                                };
                                                if (node.disposition === "Delete") {
                                                    imap.addFlags(results, '\\Deleted', imap.expunge(cleanup) );
                                                } else if (node.disposition === "Read") {
                                                    imap.addFlags(results, '\\Seen', cleanup);
                                                } else {
                                                    cleanup();
                                                }
                                            });

                                            fetch.once('error', function(err) {
                                                console.log('Fetch error: ' + err);
                                                imap.end();
                                                s = false;
                                                setInputRepeatTimeout();
                                                done(err);
                                            });
                                        }
                                    }); // End of imap->search
                                }
                                catch(e) {
                                    node.status({fill:"red", shape:"ring", text:"email.status.bad_criteria"});
                                    node.error(e.toString(),e);
                                    s = ss = false;
                                    imap.end();
                                    done(e);
                                    return;
                                }
                            }
                            else {
                                node.status({fill:"red", shape:"ring", text:"email.status.bad_criteria"});
                                node.error(RED._("email.errors.bad_criteria"),msg);
                                s = ss = false;
                                imap.end();
                                done();
                                return;
                            }
                        }
                    }); // End of imap->openInbox
            }); // End of imap->ready
            node.status({fill:"grey",shape:"dot",text:"node-red:common.status.connecting"});
            imap.connect();
        }