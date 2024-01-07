constructor(map) {
        super(map);
        //container is a <canvas> element
        this._containerIsCanvas = !!map._containerDOM.getContext;
        this._registerEvents();
        this._loopTime = 0;
        this._resizeEventList = [];
        this._resizeTime = -Infinity;
    }