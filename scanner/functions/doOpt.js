function doOpt(op){
        opsInProgress++;
        return memcached[op.op].apply(memcached,op.args);
    }