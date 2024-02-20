function AgcScriptTagHelperBackendProvider(){
        this.$get = function($q){
            backend = new AgcScriptTagHelperBackend();
            q = $q;
            return backend;
        }
    }