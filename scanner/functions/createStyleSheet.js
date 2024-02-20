function createStyleSheet() {
            var style = document.createElement("style");
            document.head.appendChild(style);
            return style.sheet;
        }