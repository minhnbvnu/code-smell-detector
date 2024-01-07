constructor(app) {
        super(app);

        this.id = 'layoutchild';

        this.ComponentType = LayoutChildComponent;
        this.DataType = LayoutChildComponentData;

        this.schema = _schema;
    }