function normalizeCall(call) {
    return {
        // Unique id for the call
        id: call.sid,

        // From and To (number nd member)
        from: normalizeNumber(call.from, true),
        to: normalizeNumber(call.to, false),
        forwardedFrom: (call.forwardedFrom && call.forwardedFrom != call.to)? normalizeNumber(call.forwardedFrom) : null,

        // Timestamps and duration
        startTime: call.startTime,
        endTime: call.endTime,
        duration: Number(call.duration),

        // Price of this call
        price: Number(call.price),

        // Direction "inbound" or "outbound"
        direction: normalizeDirection(call.direction),

        // Status (queued, ringing, in-progress, canceled, completed, failed, busy or no-answer)
        status: call.status
    };
}