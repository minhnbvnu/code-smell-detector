async function sayHellosSs(ctx) {
  ctx.set('Server-side-stream', 'true');
  // In case of UNARY and RESPONSE_STREAM calls it is simply the gRPC call's request

  const dataStream = [
    {
      message: 'You',
    },
    {
      message: 'Are',
    },
    {
      message: 'doing IT',
    },
    {
      message: 'Champ',
    },
  ];

  const reqMessages = { message: `hello!!! ${ctx.req.name}` };
  // combine template with reqMessage
  const updatedStream = [...dataStream, reqMessages];
  const makeStreamData = hl(updatedStream);
  ctx.res = makeStreamData;
  // ends server stream
  ctx.res.end();
}