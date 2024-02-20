function checkEmail(msg,send,done) {
            if (node.protocol === "POP3") {
                checkPOP3(msg,send,done);
            } else if (node.protocol === "IMAP") {
                if (s === false && ss == false) { checkIMAP(msg,send,done); }
            }
        }