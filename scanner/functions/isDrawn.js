function isDrawn(x, y, canvas) {
            var context = canvas.getContext('2d');
            var imgData = context.getImageData(x, y, 1, 1).data;
            if (imgData[3] > 0) {
                return true;
            }
            return false;
        }