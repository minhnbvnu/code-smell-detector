function Predictions(classes) {
        this.classes = classes;
        this.element = document.createElement('div');
        this.element.className = 'few-shot-predictions';

        this._rows = [];
        this._bars = [];
        this._percentLabels = [];

        for (var i = 0; i < classes; ++i) {
            var barContainer = document.createElement('div');
            barContainer.className = 'few-shot-predictions-bar-container';
            var bar = document.createElement('div');
            bar.className = 'few-shot-predictions-bar';
            barContainer.appendChild(bar);
            var percentLabel = document.createElement('label');
            percentLabel.className = 'few-shot-predictions-percent-label';

            var row = document.createElement('div');
            row.className = 'few-shot-predictions-row';
            row.appendChild(barContainer);
            row.appendChild(percentLabel);
            this.element.appendChild(row);

            this._rows.push(row);
            this._bars.push(bar);
            this._percentLabels.push(percentLabel);
        }
    }