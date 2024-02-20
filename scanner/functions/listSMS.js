function listSMS(opts) {
    return normalize.pagination(
        client.listMessages,
        'messages',
        normalize.sms,
        opts
    );
}