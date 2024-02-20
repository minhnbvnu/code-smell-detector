function closeSession(sessionid) {
        try {
            sessions[sessionid].removeAllListeners();
        } catch (e) { }
        try {
            sessions[sessionid].close();
        } catch (e) { }
        delete sessions[sessionid];
    }