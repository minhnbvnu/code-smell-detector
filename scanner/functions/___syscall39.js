function ___syscall39(which,varargs){SYSCALLS.varargs=varargs;try{var path=SYSCALLS.getStr(),mode=SYSCALLS.get();return SYSCALLS.doMkdir(path,mode)}catch(e){if(typeof FS==="undefined"||!(e instanceof FS.ErrnoError))abort(e);return-e.errno}}