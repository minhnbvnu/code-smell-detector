function setupCounters(emitter) {
        if(process.send) {
            emitter.on(Engine.Events.SCRIPT_ACK, function(packet) {
                process.send({
                    type: 'counter',
                    name: Engine.Events.SCRIPT_ACK,
                    pid: process.pid});
            })
            emitter.on(Engine.Events.STATEMENT_REQUEST, function(packet) {
                process.send({
                    type: 'counter',
                    name: Engine.Events.STATEMENT_REQUEST,
                    pid: process.pid});
            })
            emitter.on(Engine.Events.STATEMENT_RESPONSE, function(packet) {
                process.send({
                    type: 'counter',
                    name: Engine.Events.STATEMENT_RESPONSE,
                    pid: process.pid});
            })
            emitter.on(Engine.Events.SCRIPT_DONE, function(packet) {
                process.send({
                    type: 'counter',
                    name: Engine.Events.SCRIPT_DONE,
                    pid: process.pid});
            })
        }
    }