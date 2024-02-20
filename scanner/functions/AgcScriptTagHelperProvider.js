function AgcScriptTagHelperProvider(){
        this.$get = function($q){
            backend = backend || new AgcScriptTagHelperBackend();
            q = q || $q;
            return backend.mockHelper;
        }
    }