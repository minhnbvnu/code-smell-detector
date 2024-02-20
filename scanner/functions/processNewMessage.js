function processNewMessage(msg, mailMessage) {
            msg = RED.util.cloneMessage(msg); // Clone the message
            // Populate the msg fields from the content of the email message
            // that we have just parsed.
            msg.payload = mailMessage.text;
            msg.topic = mailMessage.subject;
            msg.date = mailMessage.date;
            msg.header = {};
            mailMessage.headers.forEach((v, k) => {msg.header[k] = v;});
            if (mailMessage.html) { msg.html = mailMessage.html; }
            if (mailMessage.to && mailMessage.to.length > 0) { msg.to = mailMessage.to; }
            if (mailMessage.cc && mailMessage.cc.length > 0) { msg.cc = mailMessage.cc; }
            if (mailMessage.bcc && mailMessage.bcc.length > 0) { msg.bcc = mailMessage.bcc; }
            if (mailMessage.from && mailMessage.from.value && mailMessage.from.value.length > 0) { msg.from = mailMessage.from.value[0].address; }
            if (mailMessage.attachments) { msg.attachments = mailMessage.attachments; }
            else { msg.attachments = []; }
            node.send(msg); // Propagate the message down the flow
        }