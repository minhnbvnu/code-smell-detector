function CursorBlinkStateManager(terminal, renderCallback) {
        this.renderCallback = renderCallback;
        this.isCursorVisible = true;
        if (terminal.isFocused) {
            this._restartInterval();
        }
    }