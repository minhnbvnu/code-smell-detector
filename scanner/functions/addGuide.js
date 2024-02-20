function addGuide(position, orientation) {
        var horizontalRulerData = selectedArtboard.sketchObject.horizontalRulerData();
        var verticalRulerData = selectedArtboard.sketchObject.verticalRulerData();
        var value;
        if (/^[0-9]+(\.[0-9]+)?$/.test(position)) {
            value = parseFloat(position);
        }
        if (/^[0-9]+(\.[0-9]+)?%$/.test(position)) {
            value = selectedArtboard.frame.width * parseFloat(position) / 100;
        }
       value = Math.round(value);
        if (orientation == 0) {
            horizontalRulerData.addGuideWithValue(value);
        } else {
            verticalRulerData.addGuideWithValue(value);
        }
    }