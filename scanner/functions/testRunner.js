function testRunner(script, test, obj, app) {
    var emitter = new EventEmitter();
    var ack = 0, compileError = 0, inFlight = 0, success = 0, error = 0, done = 0, request = 0, response = 0;
    emitter.on(Engine.Events.SCRIPT_ACK, function() {
        ack++;
    });
    emitter.on(Engine.Events.SCRIPT_COMPILE_ERROR, function() {
        compileError++;
    });
    emitter.on(Engine.Events.STATEMENT_IN_FLIGHT, function() {
        inFlight++;
    });
    emitter.on(Engine.Events.STATEMENT_SUCCESS, function() {
        success++;
    });
    emitter.on(Engine.Events.STATEMENT_ERROR, function() {
        error++;
    });
    emitter.on(Engine.Events.STATEMENT_REQUEST, function() {
        request++;
    });
    emitter.on(Engine.Events.STATEMENT_RESPONSE, function() {
        response++;
    });

    var conn;
    emitter.on(Engine.Events.SCRIPT_DONE, function(data, connection) {
        done++;
        test.equals(obj.ack, ack);
        test.equals(obj.compileError, compileError);
        test.equals(obj.inFlight, inFlight);
        test.equals(obj.error, error);
        test.equals(obj.request, request);
        test.equals(obj.response, response);
        test.equals(obj.done, done);
        app.close();
        connection.close();
        test.done();
    });
    var socket = new WebSocketClient();
    var events = [Engine.Events.SCRIPT_ACK, Engine.Events.SCRIPT_COMPILE_ERROR,
        Engine.Events.STATEMENT_ERROR, Engine.Events.STATEMENT_IN_FLIGHT, Engine.Events.STATEMENT_SUCCESS,
        Engine.Events.STATEMENT_REQUEST, Engine.Events.STATEMENT_RESPONSE, Engine.Events.SCRIPT_DONE];
    socket.on('connect', function(connection) {
        conn = connection;
        // Tell the server what notifications to receive
        var packet = {
            type : 'events',
            data : JSON.stringify(events)
        }
        connection.sendUTF(JSON.stringify(packet));

        packet = {
            type : 'script',
            data : script
        }
        connection.sendUTF(JSON.stringify(packet));
        connection.on('message', function(message) {
            var event = JSON.parse(message.utf8Data);
            emitter.emit(event.type, event.data, connection);
        });
    });
    socket.connect('ws://localhost:3000/', 'ql.io-console');
}