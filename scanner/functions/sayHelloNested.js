async function sayHelloNested(ctx) {
  ctx.set('UNARY', 'true');
  // nested unary response call
  const firstPerson = ctx.req.firstPerson.name;
  const secondPerson = ctx.req.secondPerson.name;
  ctx.res = {
    serverMessage: [
      { message: `Hello! ${firstPerson}` },
      { message: `Hello! ${secondPerson}` },
    ],
  };
}