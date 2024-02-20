function PressRecognizer() {
            Recognizer.apply(this, arguments);
            this._timer = null;
            this._input = null;
        }