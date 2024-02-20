function loop() {
        var msgs = window.zuul_msg_bus.splice(0, window.zuul_msg_bus.length);
        msgs.forEach(send);
        setTimeout(loop, 100);
    }