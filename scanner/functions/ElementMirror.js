function ElementMirror() {
            this.isVisible = false; // must be explicitly enabled
            this.sourceEl = null;
            this.mirrorEl = null;
            this.sourceElRect = null; // screen coords relative to viewport
            // options that can be set directly by caller
            this.parentNode = document.body;
            this.zIndex = 9999;
            this.revertDuration = 0;
        }