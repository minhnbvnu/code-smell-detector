function _retry(args, client, options, reason) {
    var msg = 'Retrying on ' + reason + ' - ' + args.uri;
    args.logEmitter.emitEvent(args.httpReqTx.event, {
        message: msg
    });
    // End the current event.
    args.logEmitter.endEvent(args.httpReqTx.event, msg);
    sendMessage(args, client, options, 1);
}