function DrawBoxOptions(options) {
            if (options === void 0) { options = {}; }
            var boxColor = options.boxColor, lineWidth = options.lineWidth, label = options.label, drawLabelOptions = options.drawLabelOptions;
            this.boxColor = boxColor || 'rgba(0, 0, 255, 1)';
            this.lineWidth = lineWidth || 2;
            this.label = label;
            var defaultDrawLabelOptions = {
                anchorPosition: AnchorPosition.BOTTOM_LEFT,
                backgroundColor: this.boxColor
            };
            this.drawLabelOptions = new DrawTextFieldOptions(Object.assign({}, defaultDrawLabelOptions, drawLabelOptions));
        }