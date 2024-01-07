constructor(component, data) {
        super();

        this._component = component;

        this._frame = 0;
        this._sprite = null;
        this._spriteAsset = null;
        this.spriteAsset = data.spriteAsset;

        this.name = data.name;
        this.fps = data.fps || 0;
        this.loop = data.loop || false;

        this._playing = false;
        this._paused = false;

        this._time = 0;
    }