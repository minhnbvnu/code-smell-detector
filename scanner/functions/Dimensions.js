function Dimensions(width, height) {
            if (!isValidNumber(width) || !isValidNumber(height)) {
                throw new Error("Dimensions.constructor - expected width and height to be valid numbers, instead have " + JSON.stringify({ width: width, height: height }));
            }
            this._width = width;
            this._height = height;
        }