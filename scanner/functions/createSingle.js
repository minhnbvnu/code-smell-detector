function createSingle(e, en, fn, scope){
            return function(){
                e.removeListener(en, fn, scope);
                return fn.apply(scope, arguments);
            };
        }