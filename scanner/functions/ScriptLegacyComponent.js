constructor(system, entity) {
        super(system, entity);
        this.on('set_scripts', this.onSetScripts, this);
    }