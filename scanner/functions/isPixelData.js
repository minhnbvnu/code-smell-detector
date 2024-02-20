function isPixelData(object) {
            if (!object) {
                return false;
            }
            var className = classString(object);
            if (PIXEL_CLASSES.indexOf(className) >= 0) {
                return true;
            }
            return (isNumericArray(object) ||
                isRectArray(object) ||
                isNDArrayLike(object));
        }