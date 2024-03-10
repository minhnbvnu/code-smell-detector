                                                    simpleParser(stream, {}, function(err, parsed) {
                                                        if (err) {
                                                            node.status({fill:"red", shape:"ring", text:"email.status.parseerror"});
                                                            node.error(RED._("email.errors.parsefail", {folder:node.box}),err);
                                                        }
                                                        else {
                                                            processNewMessage(msg, parsed);
                                                        }
                                                    });