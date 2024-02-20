function killPrevEvent() {
        if (!emitterID || socket === undefined || socket.readyState !== 1) {
            return;
        }
        var packet = {
            type : 'kill',
            id : emitterID
        };
        socket.send(JSON.stringify(packet));
        delPic();
        $('#step').hide();
    }