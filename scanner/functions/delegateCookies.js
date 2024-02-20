function delegateCookies(ctx, ctxCaller) {
  const _cookies = ctx.cookies;
  Object.defineProperty(ctx, 'cookies', {
    get() {
      return ctxCaller.cookies || _cookies;
    },
  });
}