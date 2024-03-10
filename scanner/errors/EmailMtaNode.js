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