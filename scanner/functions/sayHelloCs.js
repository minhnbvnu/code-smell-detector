async function sayHelloCs(ctx) {
  // create new metadata
  ctx.set('client-side-stream', 'true');

  const messages = [];

  return new Promise((resolve, reject) => {
    // ctx.req is the incoming readable stream
    hl(ctx.req)
      .map((message) => {
        console.log('parsed stream message with name key, ', message);
        // currently the proto file is setup to only read streams with the key "name"
        // other named keys will be pushed as an empty object
        messages.push(message);
        return undefined;
      })
      .collect()
      .toCallback((err, result) => {
        if (err) return reject(err);
        // console.log("messages ->", messages);
        ctx.response.res = { message: `received ${messages.length} messages` };
        return resolve();
      });
  });
}