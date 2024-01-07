constructor(system, entity) {
        super(system, entity);

        this._handleReference = new EntityReference(this, 'handleEntity', {
            'element#gain': this._onHandleElementGain,
            'element#lose': this._onHandleElementLose,
            'element#set:anchor': this._onSetHandleAlignment,
            'element#set:margin': this._onSetHandleAlignment,
            'element#set:pivot': this._onSetHandleAlignment
        });

        this._toggleLifecycleListeners('on');
    }