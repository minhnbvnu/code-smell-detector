async function solana_send(transport, instruction, p1, payload) {
  var p2 = 0;
  var payload_offset = 0;

  if (payload.length > MAX_PAYLOAD) {
    while (payload.length - payload_offset > MAX_PAYLOAD) {
      const buf = payload.slice(payload_offset, payload_offset + MAX_PAYLOAD);
      payload_offset += MAX_PAYLOAD;
      console.log(
        'send',
        (p2 | P2_MORE).toString(16),
        buf.length.toString(16),
        buf,
      );
      const reply = await transport.send(
        LEDGER_CLA,
        instruction,
        p1,
        p2 | P2_MORE,
        buf,
      );
      if (reply.length !== 2) {
        throw new Error(
          'solana_send: Received unexpected reply payload',
          'UnexpectedReplyPayload',
        );
      }
      p2 |= P2_EXTEND;
    }
  }

  const buf = payload.slice(payload_offset);
  console.log('send', p2.toString(16), buf.length.toString(16), buf);
  const reply = await transport.send(LEDGER_CLA, instruction, p1, p2, buf);

  return reply.slice(0, reply.length - 2);
}