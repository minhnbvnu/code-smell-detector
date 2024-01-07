constructor(parentComponent, entityPropertyName, eventConfig) {
        super();

        if (!parentComponent || !(parentComponent instanceof Component)) {
            throw new Error('The parentComponent argument is required and must be a Component');
        } else if (!entityPropertyName || typeof entityPropertyName !== 'string') {
            throw new Error('The propertyName argument is required and must be a string');
        } else if (eventConfig && typeof eventConfig !== 'object') {
            throw new Error('If provided, the eventConfig argument must be an object');
        }

        this._parentComponent = parentComponent;
        this._entityPropertyName = entityPropertyName;
        this._entity = null;
        this._app = parentComponent.system.app;

        this._configureEventListeners(eventConfig || {}, {
            'entity#destroy': this._onEntityDestroy
        });
        this._toggleLifecycleListeners('on');
    }