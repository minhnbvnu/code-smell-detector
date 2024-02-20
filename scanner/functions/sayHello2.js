function sayHello2 (ctx) {
    ctx.res = { message: 'Hello ' + ctx.req.name }
  }