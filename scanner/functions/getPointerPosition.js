function getPointerPosition(event){return _msieVersion&&insideIFrame?event["screen"+XY]:COMPATIBILITY.page(event)[xy]}