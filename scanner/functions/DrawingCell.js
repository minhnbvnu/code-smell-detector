function DrawingCell(size) {
        this.onChange = function() {};

        this.size = size;

        this.element = document.createElement('div');
        this.element.className = 'few-shot-cell';

        this._canvas = document.createElement('canvas');
        this._canvas.className = 'few-shot-cell-canvas';
        this._canvas.width = size * UPSAMPLE;
        this._canvas.height = size * UPSAMPLE;
        this.element.appendChild(this._canvas);

        this._emptyLabel = document.createElement('label');
        this._emptyLabel.className = 'few-shot-cell-empty-label';
        this._emptyLabel.textContent = 'Draw Here';
        this.element.appendChild(this._emptyLabel);

        this._paths = [];
        this._redraw();

        this._enabled = false;
    }