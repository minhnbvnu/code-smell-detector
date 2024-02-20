function TapRecognizer() {
            Recognizer.apply(this, arguments);
            // previous time and center,
            // used for tap counting
            this.pTime = false;
            this.pCenter = false;
            this._timer = null;
            this._input = null;
            this.count = 0;
        }