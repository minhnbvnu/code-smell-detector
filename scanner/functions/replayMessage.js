function replayMessage(msg) {
        if (inbrowser) {
            if (firstMessage)
                document.open();
            firstMessage = false;
            document.write(msg);
        } else {
            console.log(msg);
        }
    }