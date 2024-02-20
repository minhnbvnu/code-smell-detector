function basic(user, pass) {
        var str = typeof pass == 'undefined' ? user : [user, pass].join(':');
        return 'Basic ' + Buffer.from(str).toString('base64');
    }