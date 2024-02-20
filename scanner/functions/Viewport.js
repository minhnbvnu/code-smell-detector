function Viewport(terminal, viewportElement, scrollArea, charMeasure) {
        var _this = this;
        this.terminal = terminal;
        this.viewportElement = viewportElement;
        this.scrollArea = scrollArea;
        this.charMeasure = charMeasure;
        this.scrollBarWidth = 0;
        this.currentRowHeight = 0;
        this.lastRecordedBufferLength = 0;
        this.lastRecordedViewportHeight = 0;
        this.lastRecordedBufferHeight = 0;
        this.scrollBarWidth = (this.viewportElement.offsetWidth - this.scrollArea.offsetWidth) || FALLBACK_SCROLL_BAR_WIDTH;
        this.viewportElement.addEventListener('scroll', this.onScroll.bind(this));
        setTimeout(function () { return _this.syncScrollArea(); }, 0);
    }