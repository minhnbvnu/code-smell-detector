function ___syscall20(which,varargs){SYSCALLS.varargs=varargs;try{return PROCINFO.pid}catch(e){if(typeof FS==="undefined"||!(e instanceof FS.ErrnoError))abort(e);return-e.errno}}