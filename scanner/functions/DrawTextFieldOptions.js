function DrawTextFieldOptions(options) {
            if (options === void 0) { options = {}; }
            var anchorPosition = options.anchorPosition, backgroundColor = options.backgroundColor, fontColor = options.fontColor, fontSize = options.fontSize, fontStyle = options.fontStyle, padding = options.padding;
            this.anchorPosition = anchorPosition || AnchorPosition.TOP_LEFT;
            this.backgroundColor = backgroundColor || 'rgba(0, 0, 0, 0.5)';
            this.fontColor = fontColor || 'rgba(255, 255, 255, 1)';
            this.fontSize = fontSize || 14;
            this.fontStyle = fontStyle || 'Georgia';
            this.padding = padding || 4;
        }