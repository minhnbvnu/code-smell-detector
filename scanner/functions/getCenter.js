function getCenter(pointers) {
            var pointersLength = pointers.length;
            // no need to loop when only one touch
            if (pointersLength === 1) {
                return {
                    x: round(pointers[0].clientX),
                    y: round(pointers[0].clientY)
                };
            }
            var x = 0, y = 0, i = 0;
            while (i < pointersLength) {
                x += pointers[i].clientX;
                y += pointers[i].clientY;
                i++;
            }
            return {
                x: round(x / pointersLength),
                y: round(y / pointersLength)
            };
        }