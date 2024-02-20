function StatusError(msg, status) {
    var err = Error.call(this, msg);
    err.status = status;
    err.name = 'StatusError';
    return err;
}