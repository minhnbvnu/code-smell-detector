function normalizeSMS(sms) {
    return {
        // Unique id for the sms
        id: sms.sid,

        // From and To (number nd member)
        from: normalizeNumber(sms.from, true),
        to: normalizeNumber(sms.to, false),

        // Date
        sentTime: sms.dateSent,

        // Body
        body: sms.body,

        // Status
        status: sms.status,

        // Price of this call
        price: Number(sms.price),

        // Direction "inbound" or "outbound"
        direction: normalizeDirection(sms.direction)
    };
}