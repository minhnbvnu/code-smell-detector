function sayHelloBidi(ctx) {
  // create new metadata
  ctx.set('bidi-stream', 'true');
  console.log('got sayHelloBidi');
  // The execution context provides scripts and templates with access to the watch metadata
  console.dir(ctx.metadata, { depth: 3, colors: true });
  let counter = 0;
  ctx.req.on('data', (data) => {
    counter++;
    ctx.res.write({ message: `bidi stream: ${data.name}` });
  });

  // calls end to client before closing server
  ctx.req.on('end', () => {
    // console.log(`done sayHelloBidi counter ${counter}`);
    // ends server stream
    ctx.res.end();
  });
}