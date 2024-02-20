function addBehavior(stub, name, fn) {
    proto[name] = function() {
        fn.apply(this, concat([this], slice(arguments)));
        return this.stub || this;
    };

    stub[name] = createBehavior(name);
}