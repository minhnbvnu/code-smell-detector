function peerErrorHandler(err) {
    let msg = err + '';
    if (! msg.endsWith('.')) { msg += '.'; }
    if (msg.indexOf('concurrent user limit') !== -1) {
        msg += ' The peer server is too popular right now. Try again in a little while.';
    }
    console.log(msg);
}