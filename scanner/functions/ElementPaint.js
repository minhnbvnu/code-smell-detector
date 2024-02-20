function ElementPaint(element, parentStack) {
            this.container = element;
            this.effects = parentStack.slice(0);
            this.curves = new BoundCurves(element);
            if (element.styles.transform !== null) {
                var offsetX = element.bounds.left + element.styles.transformOrigin[0].number;
                var offsetY = element.bounds.top + element.styles.transformOrigin[1].number;
                var matrix = element.styles.transform;
                this.effects.push(new TransformEffect(offsetX, offsetY, matrix));
            }
            if (element.styles.overflowX !== OVERFLOW.VISIBLE) {
                var borderBox = calculateBorderBoxPath(this.curves);
                var paddingBox = calculatePaddingBoxPath(this.curves);
                if (equalPath(borderBox, paddingBox)) {
                    this.effects.push(new ClipEffect(borderBox, 2 /* BACKGROUND_BORDERS */ | 4 /* CONTENT */));
                }
                else {
                    this.effects.push(new ClipEffect(borderBox, 2 /* BACKGROUND_BORDERS */));
                    this.effects.push(new ClipEffect(paddingBox, 4 /* CONTENT */));
                }
            }
        }