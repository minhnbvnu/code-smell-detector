function markSyscall(ctx, syscall) {
  if (ctx && typeof ctx === 'object') {
    ctx.syscall = syscall;
  }
}