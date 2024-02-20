function dispatchError(arg) {
    var err = arg.err, subject = arg.subject;
    subject.error(err);
}