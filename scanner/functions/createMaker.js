function createMaker(text, textSize) {
            const symbol = {
                textName: text,
                textFill: 'red',
                textSize: textSize
            };
            if (!symbol.textSize) {
                delete symbol.textSize;
            }
            return new maptalks.Marker(map.getCenter(), {
                symbol
            });
        }