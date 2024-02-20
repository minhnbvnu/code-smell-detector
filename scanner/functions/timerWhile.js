function timerWhile(time) {
    const startTime = Date.now();
    while(true) {
        const now = Date.now();
        if(now - startTime >= time) {
            console.log('误差', now - startTime - time);
            return;
        }
    }
}