function saySomething (ctx) {
    ctx.res = { message: 'Hello ' + ctx.req.name }
  }