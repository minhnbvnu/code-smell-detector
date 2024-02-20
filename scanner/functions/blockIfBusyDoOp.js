function blockIfBusyDoOp(op){
        var userFunction =  op.args[op.args.length-1];
        op.args[op.args.length-1] = function(err,val) {
            opsInProgress--;
            var backedOp = requestBackup.shift();
            if(backedOp){
                doOpt(backedOp);
            }
            return userFunction(err,val);
        };

        if(opsInProgress < memcached.poolSize){
            doOpt(op);
        }
        else {
            requestBackup.push(op);
        }
    }